import { createSlice } from "@reduxjs/toolkit";
import { checkoutAsync } from "../async/checkout";
import { ITransaction } from "../type/app";

const initialState: { transaction: ITransaction } = {
  transaction: {} as ITransaction,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transaction = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        state.transaction = action.payload;
      })
      .addCase(checkoutAsync.rejected, (_, action) => {
        console.log("rejected:", action);
      })
      .addCase(checkoutAsync.pending, (_, action) => {
        console.log("pending", action);
      });
  },
});

export default checkoutSlice.reducer;