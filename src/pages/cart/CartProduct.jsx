import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CartProduct({ id, cnt, checked, name, price }) {
  return (
    <Item>
      <Grid container spacing={1}>
        <Grid xs={1}>
          <div>
            <Checkbox {...label} defaultChecked />
          </div>
        </Grid>
        <Grid xs={11}>
          <div>
            <div>제품ID : {id}</div>
            <div>제품수량 : {cnt}</div>
            <div>제품이름 : {name}</div>
            <div>제품가격 : {price}</div>
            <div>체크상태 : {checked.toString()}</div>
            <div>총 가격 : {(price * cnt).toLocaleString("ko-KR")}</div>
          </div>
        </Grid>
      </Grid>
    </Item>
  );
}

export default CartProduct;
