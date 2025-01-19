import React, { useEffect, useState } from "react";
import { ICart } from "../../redux/type/app";
import { API } from "../../lib";
import { useAppDispatch } from "../../redux";
import { cartUser } from "../../redux/async/carts";
import { Box, Divider, Typography, Button } from "@mui/material";
import CartSummary from "./CartSummary";

interface IProps {
  cart: ICart;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}

const CartItems: React.FC<IProps> = ({ cart, qty, onAdd, onRemove }) => {
  const product = cart.product;
  const id = cart.id;
  const [totalOrder, setTotalOrder] = useState(qty || 0);
  const dispatch = useAppDispatch();

  const editCart = async (newQty: number) => {
    try {
      const data = { qty: newQty };
      const response = await API.patch(`/carts/${cart.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response editchart", response.data);

      dispatch(cartUser());
    } catch (error: any) {
      console.error("Error saat memperbarui cart:", error.response?.data || error.message);
    }
  };

  const handleAdd = async () => {
    if (product && totalOrder < product.stock) {
      const newTotalOrder = totalOrder + 1;
      setTotalOrder(newTotalOrder);
      await editCart(newTotalOrder);
      onAdd();
    }
  };

  const handleRemove = async () => {
    if (totalOrder > 0) {
      const newTotalOrder = totalOrder - 1;
      setTotalOrder(newTotalOrder);
      await editCart(newTotalOrder);
      onRemove();
    }
  };

  useEffect(() => {
    setTotalOrder(qty);
  }, [qty]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box sx={{ width: "60%" }}>
          <Divider sx={{ borderColor: "#613D2B" }} />
          {product && (
            <React.Fragment>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
                <img src={product.productPhoto} alt={product.nameProduct} style={{ width: "80px", height: "80px", marginRight: "20px" }} />
                <Typography variant="h6" color="#613D2B">
                  {product.nameProduct}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Button variant="outlined" onClick={handleRemove}>
                  -
                </Button>
                <Typography
                  sx={{
                    width: "40px", // Tetapkan lebar
                    textAlign: "center", // Teks rata tengah
                    fontSize: "16px", // Ukuran font konsisten
                    padding: "5px", // Tambahkan padding jika diperlukan
                  }}
                >
                  {totalOrder}
                </Typography>
                <Button variant="outlined" onClick={handleAdd}>
                  +
                </Button>
              </Box>
              <Divider sx={{ borderColor: "#613D2B", marginY: 2 }} />
            </React.Fragment>
          )}
        </Box>
        <Box sx={{ width: "35%" }}>{product && <CartSummary totalOrder={totalOrder} product={product} id={id} />}</Box>
      </Box>
    </Box>
  );
};

export default CartItems;
