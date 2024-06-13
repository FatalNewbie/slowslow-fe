import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const getCartsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("orders"));
};

const getCheckedFromLocalStorage = (id) => {
  const carts = getCartsFromLocalStorage();
  let product;
  carts.map((cart) => (cart.productId === id ? (product = cart) : ""));
  return product.checked;
};

function CartProduct({ id, cnt, checked, name, price }) {
  const [isChecked, setChecked] = useState(getCheckedFromLocalStorage(id));
  const [carts, setCarts] = useState(getCartsFromLocalStorage);

  // checkbox 이벤트함수
  const handleChange = (event) => {
    setChecked(event.target.checked);
    const newCarts = carts.map((cart) =>
      cart.productId == id ? { ...cart, checked: event.target.checked } : cart
    );
    localStorage.setItem("orders", JSON.stringify(newCarts));
    console.log(JSON.parse(localStorage.getItem("orders")));
    console.log(id);
  };

  return (
    <Item>
      <Grid container spacing={1}>
        <Grid xs={1}>
          <div>
            <Checkbox {...label} checked={isChecked} onChange={handleChange} />
          </div>
        </Grid>
        <Grid xs={10}>
          <div>
            <div>제품ID : {id}</div>
            <div>제품수량 : {cnt}</div>
            <div>제품이름 : {name}</div>
            <div>제품가격 : {price}</div>
            <div>체크상태 : {checked.toString()}</div>
            <div>현재체크상태 : {isChecked.toString()}</div>
            <div>총 가격 : {(price * cnt).toLocaleString("ko-KR")}</div>
          </div>
        </Grid>
        <Grid xs={1}>
          <Button variant="text">삭제</Button>
        </Grid>
      </Grid>
    </Item>
  );
}

export default CartProduct;
