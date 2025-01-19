import { Box, Button, Typography } from "@mui/material";
import { IProduct } from "../../redux/type/app";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux";
import { cartIdUser } from "../../redux/async/carts";

interface CartSummaryProps {
  totalOrder: number;
  product: IProduct;
  id: string; // Tambahkan `cartId` sebagai props
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalOrder, product, id }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(cartIdUser(id)); 
    }
  }, [dispatch, id]);

  return (
    <Box border={"1px solid #613D2B"} padding={2}>
      <Typography>Sub total: {product.price * totalOrder}</Typography>
      <Typography>Quantity: {totalOrder}</Typography>
      <Button variant="contained" color="primary">
        Submit Order
      </Button>
    </Box>
  );
};

export default CartSummary;
