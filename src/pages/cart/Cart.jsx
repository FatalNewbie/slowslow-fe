import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CartProduct from './components/CartProduct';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// MUI 체크박스 만드는데 필요한 라벨
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// MUI 그리드 안에 들어가는 Item스타일
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// 모달에 들어가는 스타일
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// 전체선택 여부 초기에 확인하는 함수
const initSelectAll = () => {
    // 로컬스토리지의 값들이 전부 ture인지 확인하는 변수
    let isAllChecked = true;
    const carts = JSON.parse(localStorage.getItem('orders'));
    if (carts === null) {
        return true;
    }
    carts.map((cart) => {
        // 로컬 스토리지 체크박스중 체크가 꺼진 체크박스가 존재한다면 isAllChecked를 false로 바꿈.
        if (cart.checked === false) {
            isAllChecked = false;
        }
    });

    return isAllChecked;
};

// 메인 함수-----------------------------------------------------------------------------------------------------------------------------
function Cart() {
    // 로컬스토리지에 들어있는 제품 항목들을 가져와 담을 변수 products. json객체들이 들어있는 배열
    const [products, setProducts] = useState([]);
    // 상품 총 합계
    const [totalProductAmount, setTotalProductAmount] = useState(0);
    // 전체선택 체크박스 체크상태
    const [selectAll, setSelectAll] = useState(initSelectAll);
    // 배송비설정
    const [deliveryFee, setDeliveryFee] = useState(0);
    // 전체선택 버튼을 직접 눌러서 체크해제 했을때만 true로 바뀌는 변수. 필요이유 아래 설명.
    const [allCheckUncheckedByUser, setAllCheckUncheckedByUser] = useState(false);

    // 모달용 변수와 함수. 장바구니를 아무것도 선택안하고 결제하기 눌렀을때 열리는 모달.
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 백엔드 서버에서 제품 정보를 가져오는 함수
    const fetchProductDetails = async (productId) => {
        const response = await fetch(`http://34.47.79.214:8080/cart/${productId}`);
        const data = await response.json();
        return data;
    };

    // 전체선택 체크박스 이벤트핸들러
    const handleCheckChange = (event) => {
        const carts = JSON.parse(localStorage.getItem('orders'));
        const newCarts = carts.map((cart) => {
            return { ...cart, checked: event.target.checked };
        });
        localStorage.setItem('orders', JSON.stringify(newCarts));
        //getProducts();
        setSelectAll(event.target.checked);
        // 총상픔금액 계산
        CalcTotalProductAmount();
        if (!event.target.checked) {
            setAllCheckUncheckedByUser(true);
            return;
        }

        setAllCheckUncheckedByUser(false);
    };

    // 선택삭제 버튼 이벤트핸들러
    const DeleteSelectionBtnHandler = async (event) => {
        // 로컬스토리지 가져와서 JSON문자열을 JavaScript 객체로 변환.
        let carts = JSON.parse(localStorage.getItem('orders'));
        // 체크해제된 항목들로 이루어진 새로운 배열 생성
        carts = carts.filter((cart) => cart.checked === false);
        // 수정된 배열을 JSON 문자열로 변환.
        const newCarts = JSON.stringify(carts);

        // 로컬스토리지에 다시 저장
        localStorage.setItem('orders', newCarts);
        // 물품 다시 불러옴.
        await getProducts();
        // 총주문액 다시 계산.
        CalcTotalProductAmount();
    };

    // 구매하기 버튼 핸들러
    const purchaseBtnhandler = () => {
        // 장바구니의 모든 선택이 해제되어있는지 체크하는 변수.
        let allSelectFalse = true;
        const carts = JSON.parse(localStorage.getItem('orders'));
        carts.map((cart) => {
            if (cart.checked) {
                allSelectFalse = false;
            }
        });

        if (allSelectFalse === true) {
            handleOpen();
        }
    };

    // 로컬스토리지에 들어있는 제품들을 가져와서 백엔드 서버의 제품 정보와 합치는 함수
    const getProducts = async () => {
        // 로컬스토리지에서 값을 꺼내와서 JSON형태로 저장
        const cart = JSON.parse(localStorage.getItem('orders'));
        if (cart === null) {
            return [];
        }
        // 각 제품의 상세 정보를 백엔드에서 가져옴
        const detailedProducts = await Promise.all(
            cart.map(async (product) => {
                const details = await fetchProductDetails(product.productId);

                return {
                    ...product,
                    productName: details.productName,
                    productPrice: details.price,
                };
            })
        );
        //백엔드와 합쳐준 값을 products에 넣어줌.
        setProducts(detailedProducts);

        //합쳐준 값을 로컬스토리지에 저장.
        localStorage.setItem('orders', JSON.stringify(detailedProducts));
    };

    // 총 가격 계산하는 함수.
    const CalcTotalProductAmount = async () => {
        // 총 가격 저장할 변수
        let totalAmount = 0;
        //로컬 스토리지 가져옴.
        const carts = JSON.parse(localStorage.getItem('orders'));
        if (carts === null) {
            return;
        }
        await Promise.all(
            // 로컬스토리지 값 순차접근
            carts.map(async (cart) => {
                if (cart.checked === true) {
                    //백엔드에서 해당하는 상품 가져옴.
                    const productFromBE = await fetchProductDetails(cart.productId);

                    totalAmount = totalAmount + productFromBE.price * Number(cart.productCnt);
                }
            })
        );
        setTotalProductAmount(totalAmount);

        // 총 구매금액이 50,000원 미만이면 배솧비 3,000원 추가
        if (totalAmount > 0 && totalAmount < 50000) {
            setDeliveryFee(3000);
            return;
        }
        // 50,000 이상이면 무료
        if (totalAmount >= 50000) {
            setDeliveryFee(0);
        }
    };

    // 자식컴포넌트에서 전체선택 변경신호를 받기 위한 함수, allCheckUncheckedByUser를 false로 바꿔줌.
    const parentSelectAll = (parentSelectAll) => {
        setSelectAll(parentSelectAll);
        setAllCheckUncheckedByUser(false);
    };

    //자식컴포넌트 삭제버튼 눌렀을시 호출되는 함수.
    const productDelete = async (id) => {
        // 로컬스토리지 가져와서 JSON문자열을 JavaScript 객체로 변환.
        let carts = JSON.parse(localStorage.getItem('orders'));
        // 넘겨받은 매개변수 id를 가진 객체를 제외한 새로운 배열 생성
        carts = carts.filter((cart) => cart.productId !== id);
        // 수정된 배열을 JSON 문자열로 변환.
        const newCarts = JSON.stringify(carts);
        // 로컬스토리지에 다시 저장
        localStorage.setItem('orders', newCarts);
        // 물품 다시 불러옴.
        await getProducts();
        // 총주문액 다시 계산.
        CalcTotalProductAmount();
    };

    //테스트용 리셋버튼 핸들러
    const resetBtnHandler = (event) => {
        let resetCarts = [];
        resetCarts.push({
            productId: 1,
            productCnt: 1,
            checked: true,
        });
        resetCarts.push({
            productId: 2,
            productCnt: 1,
            checked: true,
        });
        resetCarts.push({
            productId: 3,
            productCnt: 1,
            checked: true,
        });
        resetCarts.push({
            productId: 4,
            productCnt: 1,
            checked: true,
        });
        localStorage.setItem('orders', JSON.stringify(resetCarts));
        getProducts();
        CalcTotalProductAmount();
        window.location.reload();
    };

    // useEffect를 사용하여 페이지 로딩시 필요값 세팅.
    useEffect(() => {
        // 로컬스토리지에서 제품들 불러옴.
        getProducts();
        // 총 가격 계산.
        CalcTotalProductAmount();
    }, []);

    return (
        <Box>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <Box sx={{ fontSize: 27, fontWeight: 'bold' }}>장바구니</Box>
                        </Grid>
                        <Grid xs={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'right',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                    gap: 1,
                                    height: '100%',
                                }}
                            >
                                <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>장바구니 &gt;</Box>
                                <Box
                                    sx={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: 'rgb(195, 195, 195)',
                                    }}
                                >
                                    주문/결제 &gt;
                                </Box>
                                <Box
                                    sx={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: 'rgb(195, 195, 195)',
                                    }}
                                >
                                    주문완료
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <hr
                        style={{
                            height: `2px`,
                            backgroundColor: `black`,
                            border: 'none',
                        }}
                    />
                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        {localStorage.getItem('orders') !== null &&
                        JSON.parse(localStorage.getItem('orders')).length > 0 ? (
                            <Grid xs={8}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid xs={10}>
                                            <Box>
                                                {/* 전체선택 체크박스 */}
                                                <Checkbox
                                                    {...label}
                                                    checked={selectAll}
                                                    onChange={handleCheckChange}
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: 'rgb(88, 101, 85)',
                                                        },
                                                    }}
                                                />{' '}
                                                전체선택
                                            </Box>
                                        </Grid>
                                        <Grid xs={2}>
                                            <Box sx={{ textAlign: `right` }}>
                                                <Button onClick={DeleteSelectionBtnHandler}>선택삭제</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {products.map((product) => (
                                    // key는 React.js에서만, map안에서 component들을 render할 때 사용한다.
                                    <Box key={product.productId}>
                                        <CartProduct
                                            id={product.productId}
                                            cnt={product.productCnt}
                                            checked={product.checked}
                                            name={product.productName}
                                            price={product.productPrice}
                                            parentSelectAll={parentSelectAll}
                                            CalcTotalProductAmount={CalcTotalProductAmount}
                                            selectAll={selectAll}
                                            allCheckUncheckedByUser={allCheckUncheckedByUser}
                                            productDelete={productDelete}
                                        />
                                    </Box>
                                ))}
                            </Grid>
                        ) : (
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    mt: 5,
                                    mb: 50,
                                    flexGrow: 1,
                                    fontSize: 20,
                                }}
                            >
                                장바구니에 담은 상품이 없습니다.
                            </Box>
                        )}
                        {localStorage.getItem('orders') !== null &&
                        JSON.parse(localStorage.getItem('orders')).length > 0 ? (
                            <Grid xs={4}>
                                <Item>
                                    <Grid container spacing={2}>
                                        <Grid xs={12}>
                                            <Box
                                                sx={{
                                                    textAlign: `left`,
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    pl: 3,
                                                    pt: 2,
                                                    color: `black`,
                                                }}
                                            >
                                                주문 예상 금액
                                            </Box>
                                        </Grid>
                                        <Grid xs={6}>
                                            <Box
                                                sx={{
                                                    textAlign: `left`,
                                                    pl: 3,
                                                    color: `black`,
                                                    fontSize: 17,
                                                }}
                                            >
                                                총 상품 가격
                                            </Box>
                                        </Grid>
                                        <Grid xs={6}>
                                            <Box
                                                sx={{
                                                    textAlign: `right`,
                                                    pr: 3,
                                                    color: `black`,
                                                    fontSize: 17,
                                                }}
                                            >
                                                {totalProductAmount.toLocaleString('ko-KR')} 원
                                            </Box>
                                        </Grid>
                                        <Grid xs={6}>
                                            <Box
                                                sx={{
                                                    textAlign: `left`,
                                                    pl: 3,
                                                    color: `black`,
                                                    fontSize: 17,
                                                }}
                                            >
                                                총 배송비
                                            </Box>
                                        </Grid>
                                        <Grid xs={6}>
                                            <Box
                                                sx={{
                                                    textAlign: `right`,
                                                    pr: 3,
                                                    color: `black`,
                                                    fontSize: 17,
                                                }}
                                            >
                                                {deliveryFee.toLocaleString('ko-KR')} 원
                                            </Box>
                                        </Grid>
                                        <Grid xs={12} sx={{ fontSize: 12, textAlign: `left`, pl: 4 }}>
                                            50,000원 이상 구매시 무료배송
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid xs={12}>
                                        <Box
                                            sx={{
                                                textAlign: `right`,
                                                pr: 2,
                                                color: `black`,
                                                fontSize: 21,
                                            }}
                                        >
                                            {(totalProductAmount + deliveryFee).toLocaleString('ko-KR')} 원
                                        </Box>
                                    </Grid>
                                    <br />
                                    <br />
                                    <Grid xs={12}>
                                        <Box>
                                            <Button
                                                onClick={purchaseBtnhandler}
                                                variant="contained"
                                                sx={{
                                                    width: '230px',
                                                    height: '45px',
                                                    backgroundColor: 'rgb(88, 101, 85)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgb(63, 71, 61)',
                                                    },
                                                    fontSize: 17,
                                                }}
                                            >
                                                구매하기
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Item>
                            </Grid>
                        ) : (
                            ''
                        )}
                    </Grid>
                </Box>
                <Box>
                    <Button variant="contained" onClick={resetBtnHandler}>
                        물품 리셋
                    </Button>
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center', mb: 5 }}>
                            1개 이상의 상품을 선택해 주세요.
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button onClick={handleClose}>닫기</Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </Box>
    );
}

export default Cart;
//구매하기 버튼 누르면 checked가 false인 제품들 날리고 로컬스토리지에 다시 저장

// 구현을 하다가 문제가 발생해서 방향을 수정하는 것이 아닌 문제가 발생할 것 같아서 방향을 바꿨음.
// 진짜 문제가 발생하는지는 안해봐서 모름.
// 궁금한 점 : 제가 생각하는 문제가 진짜 발생할까요?

// allCheckUncheckedByUser 필요이유
/*

  전체선택 버튼이 변경되는 4가지의 경우가 있음
  전체선택 버튼이 체크 될때
  (1) 사용자가 전체선택 버튼을 체크하여 전체선택 버튼이 체크가 됨
  (2) 모든 물품의 체크박스가 체크되어 전채선택 버튼이 체크가 됨
  전체선택 버튼이 체크 해제될때
  (3) 사용자가 전체선택 버튼을 꺼서 전체선택 버튼이 해제됨.
  (4) 모든 물품이 체크된 상태에서 하나의 물품이 체크해제되어 전체선택 버튼이 해제됨.

  위의 4가지 변화에 대해서 자식 컴포넌트들은 어떻게 반응하여 자식의 체크박스를 변경시킬 것인가?

  * 자식 컴포넌트는 부모 컴포넌트가 props로 넘겨주는 selectAll 값에 따라 자신들의 체크박스 상태를 바꿈.
  * selectAll은 전체선택 버튼의 체크 여부를 나타내는 bool변수.


  전체선택 버튼이 체크 될때의 자식 컴포넌트의 움직임
  -> selectAll이 true로 왔을때 자식의 체크박스를 체크한다고 가정.
  -> (1) 모든 물품이 체크됨. 문제 없음.
  -> (2) 모든 물품이 체크됨. 문제 없음.
  자식 컴포넌트에서 (1)과 (2)는 같은 동작으로 취급하여 동작해도 문제 없음.

  전체체크가 해제될때의 하위 컴포넌트의 움직임
  -> selectAll이 false로 넘어 왔을때 자식의 체크박스를 해제한다고 가정.
  -> (3) 모든 물품이 체크 해재됨. 문제 없음.
  -> (4) 의 경우에 사용자가 체크해제한 물품 외에 다른 물품들도 전부 체크 해제됨.
  (3)과 (4)의 경우에 자식의 동작이 달라야함.

  전체체크가 해제되는 경우에는 selectAll 뿐만이 아닌 다른 물품들의 체크 여부 상태도 확인해야함.
  모든 물품들이 체크되어있을때 자식의 체크를 해제해야함.
  체크여부는 localstorage에 저장되어 있으므로 자식 컴포넌트에서는 localstorage를 순회하며 다른 물품들의 체크 여부 상태를 확인함.
  (3)과 (4)의 경우를 구분하기위해 자식 컴포넌트는 selectAll이 false일때 lcoalstorage의 다른 물품들의 체크여부를 추가적으로 확인함.

  그리하여 자식 컴포넌트의 입장에서 (3)과 (4)의 경우가 더 세분화 됨.
  
  (3)selectAll이 false이면서 모든 물품들이 체크되어있으면 나를 체크 해제함.
  (4)selectAll이 false이면서 모든 물품들이 체크되어있지 않다면 가만히 있음.

  사실 (4)의 경우에는 별 문제가 없을 것 같은데
  (3)에서 동기화?의 문제가 발생할 것 같았음.

  만약에 지금 3개의 자식 컴포넌트(a, b, c)가 있다고 가정.
  (3)의 경우 발생.
  -> a, b, c 모두 체크가 되어 있고, 사용자가 전체선택 버튼을 클릭하여 전체선택을 해제하였음.
  selectAll이 false로 변경되어 a,b,c 에게 false 값이 props로 전달됨.
  
  자식컴포넌트들은 selectAll이 false가 되었고 다른 물품들이 체크되어있는 것을 확인하였으니 나를 체크 해제함.
  나를 체크 해제한다는 것은 나의 체크박스의 chekced값을 false로 바꾸고 localstorage의 checked값도 false로 바꿔줘야함.
  근데 여기서 만약에 b가 다른 물품들이 체크되어있는 지를 확인중인데 a가 이미 다 확인해서 자신의 로컬스토리지의 값을 false로 바꿔버림.
  b는 체크해제되어있는 a물품을 발견. (4)의 경우로 간주하여 자신을 체크해제하지 않음.

  *****이런 문제가 발생할것 같았음. 진짜 이 문제가 발생하는지는 안해봐서 모름.*****

  만약에 물품이 10개라고 가정하면 10개의 모든 자식 컴포넌트들의 checked 값이 true인지 확인되기 전까지
  그 누구도 localstorage의 checked값을 변경하면 안됨.
  모든 자식 컴포넌트들이 동시에 같은 작업 속도로 동작하지는 않을것 같은데...




  -> 이 발생할것 같은 문제를 해결하려고 부모 컴포넌트에서 새로운 props를 하나 추가했음.
  그게 이 allCheckUncheckedByUser 변수임.
  (3)의 경우와 (4)의 경우에 따라 달라지는 변수임.
 
  allCheckUncheckedByUser는 (1),(2),(4)의 경우에는 true이고
  (3)의 경우에만 false

  자식컴포넌트는 selectAll이 false이고 allCheckUncheckedByUser도 false일때만
  (3)을 실행함.

  이게 이렇게 복잡해질 일인가??
  
  





  */
