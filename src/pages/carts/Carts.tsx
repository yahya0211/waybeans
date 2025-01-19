import React, { Fragment, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux";
import { cartUser } from "../../redux/async/carts";
import CartItems from "./CartItems";

interface IProps {
  id: string;
  nameProduct: string;
  stock: number;
  qty: number;
  photoProduct: string;
  price: string;
  description: string;
}

const Carts: React.FC = () => {
  const carts = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartUser());
  }, [dispatch]);

  return (
    <Fragment>
      <Box marginTop={3} margin={10}>
        <Typography variant="h5" fontWeight={"bold"} color={"#613D2B"}>
          My Carts
        </Typography>
        <Grid container gap={5}>
          <Grid item>
            <Box borderBottom={"1px solid #613D2B"} width={700}>
              <Typography color={"#613D2B"}>Review your order</Typography>
            </Box>
          </Grid>
        </Grid>
        {carts.cart.map((cartItem: any) => {
          const transformedItem: IProps = {
            id: cartItem.id,
            nameProduct: cartItem.product.nameProduct,
            stock: cartItem.product.stock,
            qty: cartItem.qty,
            photoProduct: cartItem.product.photoProduct,
            price: cartItem.product.price,
            description: cartItem.product.description,
          };

          return (
            <CartItems key={transformedItem.id} cart={cartItem} qty={transformedItem.qty} onAdd={() => console.log("Add product:", transformedItem.nameProduct)} onRemove={() => console.log("Remove product:", transformedItem.nameProduct)} />
          );
        })}
      </Box>
    </Fragment>
  );
};

export default Carts;
