import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartUser } from "../async/carts";
import { ICart } from "../type/app";

const initialState: { cart: ICart[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartUser.fulfilled, (state, action: PayloadAction<ICart[]>) => {
        state.cart = action.payload;
      })
      .addCase(cartUser.rejected, (_, action) => {
        console.log("rejected:", action);
      })
      .addCase(cartUser.pending, (_, action) => {
        console.log("pending", action);
      });
  },
});

export default cartSlice.reducer;
