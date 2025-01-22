import React, { Fragment, useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux";
import CartItems from "./CartItems";
import { cartUser } from "../../redux/async/carts";



const Carts: React.FC = () => {
  const [localCarts, setLocalCarts] = useState<any[]>([]);
  const reduxCarts = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartUser());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(reduxCarts.cart)) {
      setLocalCarts([...reduxCarts.cart]);
    } else {
      console.warn("reduxCarts.cart is not an array:", reduxCarts.cart);
      setLocalCarts([]);
    }
  }, [reduxCarts.cart]);



  return (
    <Fragment>
      <Box marginTop={3} margin={10}>
        <Typography variant="h5" fontWeight={"bold"} color={"#613D2B"}>
          My Carts
        </Typography>
        <Grid container gap={5}>
          <Grid item>
            <Box borderBottom={"2px solid #613D2B"} width={700}>
              <Typography color={"#613D2B"}>Review your order</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Render carts */}
        {localCarts.length > 0 ? (
          localCarts.map((cartItem: any) => (
            <CartItems key={cartItem.id} cart={cartItem} qty={cartItem.qty} onAdd={() => console.log("Add product:", cartItem.product.nameProduct)} onRemove={() => console.log("Remove product:", cartItem.product.nameProduct)} />
          ))
        ) : (
          <Typography color="#613D2B" marginTop={3}>
            Your cart is empty.
          </Typography>
        )}
      </Box>
    </Fragment>
  );
};

export default Carts;
