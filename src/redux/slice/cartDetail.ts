import { createSlice } from "@reduxjs/toolkit";
import { cartIdUser } from "../async/carts";
import { ICart } from "../type/app";

const initialState: { cart: ICart } = {
  cart: {} as ICart,
};

const cartDetailSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartIdUser.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(cartIdUser.rejected, (_, action) => {
        console.log("rejected:", action);
      })
      .addCase(cartIdUser.pending, (_, action) => {
        console.log("pending", action);
      });
  },
});

export default cartDetailSlice.reducer;
