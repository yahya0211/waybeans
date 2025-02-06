import React, { useEffect, useState } from "react";
import { ICart } from "../../redux/type/app";
import { API } from "../../lib";
import { useAppDispatch, useAppSelector } from "../../redux";
import { cartUser } from "../../redux/async/carts";
import { Box, Divider, Typography, Button } from "@mui/material";
import CartSummary from "./CartSummary";
import { MdOutlineDelete } from "react-icons/md";
import { getTransaction } from "../../redux/async/checkout";

interface IProps {
  cart: ICart;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}

const CartItems: React.FC<IProps> = ({ cart, qty, onAdd, onRemove }) => {
  const dispatch = useAppDispatch();
  const transaction = useAppSelector((state) => state.checkout.transactions);
  const product = cart.product;
  const id = cart.id;
  const [totalOrder, setTotalOrder] = useState(qty);

  // Determine the image source
  const getImageSource = () => {
    if (!product?.productPhoto) return "/path/to/placeholder.jpg"; // Fallback for undefined
    return typeof product.productPhoto === "string" ? product.productPhoto : URL.createObjectURL(product.productPhoto);
  };

  const editCart = async (newQty: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found!");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const data = { qty: newQty };
      const response = await API.patch(`/carts/${cart.id}`, data, config);
      dispatch(cartUser());
      return response;
    } catch (error: any) {
      console.error("Error saat memperbarui cart:", error.response?.data || error.message);
      return null;
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found!");
      const deleteResponse = await API.delete(`/carts/${cart.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(cartUser());
      return deleteResponse;
    } catch (error) {
      console.error("Error saat menghapus cart:", error);
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
    dispatch(getTransaction());
  }, [dispatch]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <Box sx={{ width: "60%" }}>
          <Divider sx={{ borderColor: "#613D2B" }} />
          {product && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
                    <img src={getImageSource()} alt={product.nameProduct} style={{ width: "80px", height: "80px", marginRight: "20px" }} />
                    <Typography variant="h6" color="#613D2B">
                      {product.nameProduct}
                    </Typography>
                  </Box>
                  {!transaction?.find((index) => index.cartId === id) ? (
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "#613D2B",
                          borderColor: "#613D2B",
                          "&:hover": { backgroundColor: "#613D2B", color: "white" },
                        }}
                        onClick={handleRemove}
                      >
                        -
                      </Button>
                      <Typography sx={{ width: "40px", textAlign: "center", fontSize: "16px", padding: "5px" }}>{totalOrder}</Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "#613D2B",
                          borderColor: "#613D2B",
                          "&:hover": { backgroundColor: "#613D2B", color: "white" },
                        }}
                        onClick={handleAdd}
                      >
                        +
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Typography sx={{ width: "40px", textAlign: "center", fontSize: "16px", padding: "5px" }}>{totalOrder}</Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#613D2B",
                      borderColor: "#613D2B",
                      "&:hover": { backgroundColor: "#613D2B", color: "white" },
                    }}
                    onClick={handleDelete}
                  >
                    <MdOutlineDelete />
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ borderColor: "#613D2B", marginY: 2 }} />
            </>
          )}
        </Box>
        {!transaction?.find((index) => index.cartId === id) ? (
          <Box sx={{ width: "35%" }}>{product && <CartSummary totalOrder={totalOrder} product={product} id={id} />}</Box>
        ) : (
          <Typography variant="h6" color="#613D2B" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: 2 }}>
            This order is {transaction?.find((index) => index.cartId === id)?.status}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CartItems;
