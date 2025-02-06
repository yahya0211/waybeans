import { Box, Button, Typography } from "@mui/material";
import { IProduct } from "../../redux/type/app";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  totalOrder: number;
  product: IProduct;
  id: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalOrder, product, id }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {}, [dispatch, id]);

  return (
    <Box padding={2} gap={2} display={"flex"} flexDirection={"column"}>
      <Typography>Price: {product.price}</Typography>
      <Typography>Quantity: {totalOrder}</Typography>
      <Typography>Total: {product.price * totalOrder}</Typography>
      <Button variant="contained" sx={{ color: "white", backgroundColor: "#613D2B", borderColor: "#613D2B", "&:hover": { backgroundColor: "#613D2B", color: "white" } }} onClick={() => navigate(`/checkout/${id}`)}>
        Proceed to checkout
      </Button>
    </Box>
  );
};

export default CartSummary;
