import * as React from "react";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CartProduct from "./components/CartProduct";

// MUI 체크박스 만드는데 피료한 라벨
const label = { inputProps: { "aria-label": "Checkbox demo" } };

// MUI 그리드 안에 들어가는 Item스타일
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Cart() {
  // 로컬스토리지에 들어있는 제품 항목들을 가져와 담을 변수 products. json객체들이 들어있는 배열
  const [products, setProducts] = useState([]);

  // 배송비설정
  const deliveryFee = 3000;

  // 상품 총 합계
  const [totalProductAmount, setTotalProductAmount] = useState(0);

  // 백엔드 서버에서 제품 정보를 가져오는 함수
  const fetchProductDetails = async (productId) => {
    const response = await fetch(`http://localhost:8080/cart/${productId}`);
    const data = await response.json();
    return data;
  };

  // 로컬스토리지에 들어있는 제품들을 가져와서 백엔드 서버의 제품 정보와 합치는 함수, 총 가격도 여기서 더해줌.
  const getProducts = async () => {
    // 로컬스토리지에서 값을 꺼내와서 JSON형태로 저장
    const cart = JSON.parse(localStorage.getItem("orders"));

    // 각 제품의 상세 정보를 백엔드에서 가져옴
    const detailedProducts = await Promise.all(
      cart.map(async (product) => {
        const details = await fetchProductDetails(product.productId);

        setTotalProductAmount(
          (prevTotal) => prevTotal + product.productCnt * details.price
        );

        return {
          ...product,
          name: details.productName,
          price: details.price,
        };
      })
    );

    setProducts(detailedProducts);
    console.log(detailedProducts);
  };
  useEffect(() => {}, [totalProductAmount]);

  // useEffect를 사용하여 페이지 로딩시 getProducts함수 호출.
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid xs={4}>
            <Item>xs=4</Item>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <div>
              <Checkbox {...label} defaultChecked /> 전체선택
            </div>
            {products.map((product) => (
              // key는 React.js에서만, map안에서 component들을 render할 때 사용한다.
              <div>
                <CartProduct
                  id={product.productId}
                  cnt={product.productCnt}
                  checked={product.checked}
                  name={product.name}
                  price={product.price}
                />
              </div>
            ))}
          </Grid>
          <Grid xs={4}>
            <Item>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <div>주문 예상 금액</div>
                </Grid>
                <Grid xs={6}>
                  <div>총 상품 가격</div>
                </Grid>
                <Grid xs={6}>
                  <div>{totalProductAmount.toLocaleString("ko-KR")} 원</div>
                </Grid>
                <Grid xs={6}>
                  <div>총 배송비</div>
                </Grid>
                <Grid xs={6}>
                  <div>{deliveryFee.toLocaleString("ko-KR")} 원</div>
                </Grid>
              </Grid>
              <hr />
              <Grid xs={12}>
                <div>
                  {(totalProductAmount + deliveryFee).toLocaleString("ko-KR")}{" "}
                  원
                </div>
              </Grid>
              <br />
              <br />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Cart;
