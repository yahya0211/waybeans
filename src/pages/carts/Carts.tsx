import { Fragment, useEffect } from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import Navbar from "../../components/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../redux/type/app";
import { useAppDispatch, useAppSelector } from "../../redux";
import { cartUser } from "../../redux/async/carts";

interface IProps {
  id: string;
  nameProduct: string;
  stock: number;
  qty: number;
  photoProduct: string;
  price: string;
  description: string;
}

const Carts = () => {
  const navigate = useNavigate();
  const carts = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartUser());
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Box marginTop={3} margin={10}>
        <Typography variant="h5" fontWeight={"bold"} color={"#613D2B"}>
          My Carts
        </Typography>
        <Grid container gap={5}>
          <Grid item>
            <Box borderBottom={"1px solid #613D2B"} width={700}>
              <Typography color={"#613D2B"}>Review your order</Typography>
            </Box>
            {}
            <Box paddingY={3} borderBottom={"1px solid #613D2B"} width={700} display={"flex"} justifyContent={"space-between"}>
              <img src="/src/imagesSource/Rectangle1.png" style={{ paddingTop: 5, height: "200px" }} alt="Rectangle1" />
              <Box marginLeft={-30}>
                <Typography variant="h5" fontWeight={"bold"} color={"#613D2B"}>
                  {cart?.product.nameProduct || "Default Product Name"}
                </Typography>
              </Box>
              <Box justifyContent={"flex-end"} display={"flex"}>
                <Box display={"flex"} flexDirection={"column"} gap={4}>
                  <Typography color={"#613D2B"}>Rp. 30000</Typography>
                  <IconButton sx={{ color: "#613D2B" }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Box borderTop={"1px solid #613D2B"} borderBottom={"1px solid #613D2B"} marginTop={3} width={300}>
              <Grid container gap={20} marginY={5}>
                <Grid item>
                  <Typography marginBottom={2} color={"#613D2B"}>
                    Subtotal
                  </Typography>
                  <Typography color={"#613D2B"}>Qty</Typography>
                </Grid>
                <Grid item>
                  <Typography marginBottom={2} color={"#613D2B"}>
                    {/* {cart.price} */}
                  </Typography>
                  <Typography color={"#613D2B"}></Typography>
                </Grid>
              </Grid>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} marginY={4}>
              <Typography color={"#613D2B"}>Total</Typography>
              <Typography color={"#613D2B"}>618000</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Carts;

// Carts.defaultProps = {
//   product: {
//     id: "jiaeje3hthieth",
//     nameProduct: "Defult Product Name",
//     description: "aijwirjiwtjiwt",
//     price: 24242424,
//     productPhoto: "ssjaijjwiwjrwr",
//     stock: 224244,
//     // other default properties
//   },
//   qty: 10,
//   onAdd: () => {},
//   onRemove: () => {},
//   onDelete: () => {},
// };

// export default Carts;
