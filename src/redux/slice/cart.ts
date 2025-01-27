import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartUser } from "../async/carts";
import { ICart } from "../type/app";

const initialState: { cart: ICart[]; loading: boolean; error: string | null } = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartUser.fulfilled, (state, action: PayloadAction<ICart[]>) => {
        state.cart = action.payload || [];
      })
      .addCase(cartUser.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch carts";
      })
  },
});

export default cartSlice.reducer;
