import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartIdUser } from "../async/carts";
import { ICart } from "../type/app";

const initialState: { cart: ICart; isLoading: boolean; error: string | null } = {
  cart: {} as ICart,
  isLoading: false,
  error: null,
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
      .addCase(cartIdUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(cartIdUser.pending, (state) => {
        console.log("pending", state);
        state.isLoading = true;
      });
  },
});

export default cartDetailSlice.reducer;
