import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// 로컬스토리지 가져오는 함수
const getCartsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('orders'));
};

// 로컬스토리지에서 현재 id에 맞는 chekced를 가져와서 반환하는 함수.
const getCheckedFromLocalStorage = (id) => {
    const carts = getCartsFromLocalStorage();
    let product;

    carts.map((cart) => (cart.productId === id ? (product = cart) : ''));
    return product.checked;
};

// 메인 함수 ------------------------------------------------------------------------------------------------------------------------------------------
function CartProduct({
    id,
    name,
    price,
    checked,
    parentSelectAll,
    selectAll,
    allCheckUncheckedByUser,
    CalcTotalProductAmount,
    productDelete,
}) {
    const [isChecked, setChecked] = useState(getCheckedFromLocalStorage(id));
    const [cnt, setCnt] = useState(0);

    // checkbox 이벤트함수
    const handleChange = (event) => {
        setChecked(event.target.checked);
        const carts = getCartsFromLocalStorage();

        const newCarts = carts.map((cart) => {
            if (cart.productId === id) {
                return { ...cart, checked: event.target.checked };
            }
            return cart;
        });
        localStorage.setItem('orders', JSON.stringify(newCarts));
        isCheckedAll(event.target.checked);
        // 부모컴포넌트의 총상품금액 다시 계산
        CalcTotalProductAmount();
    };

    // 상품갯수 +,- 버튼 눌렸을때 불러지는 이벤트 헨들러
    const cntBtnHandler = (event) => {
        // +버튼이 눌러졌을때
        if (event.target.name === 'Btn+') {
            const carts = getCartsFromLocalStorage();
            // 바뀐 값을 useState에도 적용시키기 위해 필요한 변수
            let newCnt = 0;
            // 현재 id와 맞는 로컬스토리지의 값의 제품수량을 1 증가 시킴.
            const newCarts = carts.map((cart) => {
                if (cart.productId === id) {
                    newCnt = Number(cart.productCnt) + 1;
                    return { ...cart, productCnt: Number(cart.productCnt) + 1 };
                }
                return cart;
            });
            // 변화된 값 로컬스토리지에 저장
            localStorage.setItem('orders', JSON.stringify(newCarts));
            // 변화된 값 useState에 적용
            setCnt(newCnt);
        }

        //-버튼이 눌렸을 때 && cnt의 값이 1보다 클 때
        if (event.target.name === 'Btn-' && cnt > 1) {
            const carts = getCartsFromLocalStorage();
            // 바뀐 값을 useState에도 적용시키기 위해 필요한 변수
            let newCnt = 0;
            // 현재 id와 맞는 로컬스토리지의 값의 제품수량을 1 증가 시킴.
            const newCarts = carts.map((cart) => {
                if (cart.productId === id && cart.productCnt > 1) {
                    newCnt = Number(cart.productCnt) - 1;
                    return { ...cart, productCnt: Number(cart.productCnt) - 1 };
                }
                return cart;
            });
            // 변화된 값 로컬스토리지에 저장
            localStorage.setItem('orders', JSON.stringify(newCarts));
            // 변화된 값 useState에 적용
            setCnt(newCnt);
        }

        // 부모컴포넌트의 총상품금액 계산.
        CalcTotalProductAmount();
    };

    // 체크박스 버튼이 눌렸을때 전체선택이 적용되는지 풀리는지 판단해서 부모컴포넌트에 알리는 함수
    const isCheckedAll = (isChecked) => {
        // 현재 체크박스 외 다른 체크박스들이 전부 체크인지 확인하는 변수.
        let isAllChecked = true;
        const carts = getCartsFromLocalStorage();
        carts.map((cart) => {
            // 현재 체크박스 외 다른 체크박스중 체크가 꺼진 체크박스가 존재한다면 isAllChecked를 false로 바꿈.
            if (cart.productId !== id && cart.checked === false) {
                isAllChecked = false;
            }
        });

        // 현재 체크박스가 체크 되었고, 다른 체크박스들이 전부 체크된 상황이면 부모컴포넌트의 전체선택을 체크해줘야함.
        if (isChecked === true && isAllChecked === true) {
            parentSelectAll(true);
        }

        // 현재 체크박스가 체크해제 되었고, 다른 체크박스들이 전부 체크된 상황이면 부모컴포넌트의 전체선택을 체크해제 해줘야함.
        if (isChecked === false && isAllChecked === true) {
            parentSelectAll(false);
        }
    };

    // cnt변수 init 함수
    const initCnt = () => {
        const carts = getCartsFromLocalStorage();
        let newCnt = 0;
        carts.map((cart) => {
            if (cart.productId === id) {
                newCnt = cart.productCnt;
            }
        });

        setCnt(newCnt);
    };

    // 삭제버튼 이벤트 핸들러
    const deleteBtnHnadler = (event) => {
        //부모함수에 삭제할 제품의 id전달
        productDelete(id);
    };

    useEffect(() => {
        initCnt();
    }, []);

    // 부모 컴포넌트의 전체선택 체크가 변화하였을때 동작하는 함수인데 켜질때만 반응함.
    useEffect(() => {
        const carts = getCartsFromLocalStorage();

        // 전체선택이 true로 넘어올때는 check를 true로 바꿔줌.
        if (selectAll === true) {
            const newCarts = carts.map((cart) => {
                if (cart.productId === id) {
                    return { ...cart, checked: selectAll };
                }
                return cart;
            });
            // 로컬스토리지 저장
            localStorage.setItem('orders', JSON.stringify(newCarts));
            // 웹페이지에도 반영
            setChecked(selectAll);
        }

        /*이 함수에서 전체선택이 꺼질 때도 설정해주고 싶은데 전체 선택이 꺼지는 경우는 2가지가 있음
    1. 모두가 선택이 되어 전체선택이 켜져있을때 내가 전체선택을 눌러서 끄는 경우
    2. 모두가 선택이 되어 있는데 내가 하나의 제품의 체크박스를 꺼서 전체선택이 꺼지는 경우

    1의 경우를 생각할때 


    잠깐만 하위 애들은 상위의 체크박스를 내가 직접 건드릴때만 반응해주면 되나?
     */
    }, [selectAll]);

    // 부모 컴포넌트의 전체선택를 사용자가 눌러서 체크해제하는 경우에만 동작하는 함수.
    useEffect(() => {
        if (selectAll === false && allCheckUncheckedByUser === true) {
            const carts = getCartsFromLocalStorage();
            const newCarts = carts.map((cart) => {
                if (cart.productId === id) {
                    return { ...cart, checked: false };
                }
                return cart;
            });
            // 로컬스토리지 저장
            localStorage.setItem('orders', JSON.stringify(newCarts));
            // 웹페이지에도 반영
            setChecked(selectAll);
        }
    }, [allCheckUncheckedByUser]);

    return (
        <Item sx={{ mb: 3 }}>
            <Grid container spacing={1}>
                <Grid xs={1}>
                    <Box>
                        <Checkbox
                            {...label}
                            checked={isChecked}
                            onChange={handleChange}
                            sx={{
                                '&.Mui-checked': {
                                    color: 'rgb(88, 101, 85)',
                                },
                            }}
                        />
                    </Box>
                </Grid>
                <Grid xs={10}>
                    <Box>
                        <Box
                            sx={{
                                textAlign: 'left',
                                fontSize: 23,
                                color: `black`,
                                pl: 2,
                                pt: 2,
                            }}
                        >
                            {name}
                        </Box>

                        <Box
                            sx={{
                                textAlign: 'left',
                                fontSize: 23,
                                color: `black`,
                                pl: 2,
                                pt: 2,
                            }}
                        >
                            {(price * cnt).toLocaleString('ko-KR')}원
                        </Box>
                        <Box sx={{ textAlign: 'left', pt: 2 }}>
                            <ButtonGroup size="small" variant="contained" aria-label="Basic button group">
                                <Button
                                    name="Btn-"
                                    onClick={cntBtnHandler}
                                    sx={{
                                        backgroundColor: 'rgb(88, 101, 85)',
                                        '&:hover': {
                                            backgroundColor: 'rgb(63, 71, 61)',
                                        },
                                    }}
                                >
                                    -
                                </Button>
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    value={cnt}
                                    variant="filled"
                                    size="small"
                                    sx={{
                                        width: `8ch`,
                                        '& .MuiInputBase-input': {
                                            textAlign: 'center',
                                        },
                                    }}
                                />
                                <Button
                                    name="Btn+"
                                    onClick={cntBtnHandler}
                                    sx={{
                                        backgroundColor: 'rgb(88, 101, 85)',
                                        '&:hover': {
                                            backgroundColor: 'rgb(63, 71, 61)',
                                        },
                                    }}
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={1}>
                    <Button variant="text" onClick={deleteBtnHnadler}>
                        삭제
                    </Button>
                </Grid>
            </Grid>
        </Item>
    );
}

export default CartProduct;

//productName
//productPrice
//orderImg

// 상위 컴포넌트에서 함수하나를 props로 등록. 이 props는 상위에서 useEffect로 관리됨. 이 함수는 로컬에서 값들을 읽어오는 함수
// 상위 컴포넌트에서 전체 선택으로 로컬스토리지의 모든 checked값을 상위와 동일하게 만듦. 위의 함수를 사용해서
// 그러면 이제 상위 에서는 prop가 변경되었으니 하위로 값을 다시 던짐
// 하위에서는 porps값 중 checked를 useEffect로 등록해놔서 새로 던져진 props를 하위의 필요한 곳들에 전부 적용.

/*
체크박스를 눌러서 true로 만들때
-> 모든 체크박스들이 true인지 확인해서 전부 true라면 상우의 전체선택 체크박스를 true로 만들어줘야함

체크박스를 눌러서 false로 만들때
-> 나를 제외한 모든 체크박스들이 false인지 확인해서 전부 false라면 상위의 전체선택 체크박스를 false로 만들어줘야함.

--> 둘이 똑같은데 동작방식이??? 하나의 함수로 퉁치면 될듯.
상위 컴포넌트의 값을 바꿔주는 방법은 위에적은것처럼 props로 상위의 함수를 하나 받아와서 걔를 호출하면
(호출된 상위컴포넌트의 함수는 전체선택 채크박스의 useState값을 set하는 함수를 가지고 있음.)
상우의 체크박스를 바꿀 수 있을 것 같다.



장바구니에 동일한 아이템이 담길때 아이디 확인해서 동일한 아이템 있으면 갯수만 추가해주는거 구현해야함!!!!!!!
*/
