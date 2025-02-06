import { createSlice } from "@reduxjs/toolkit";
import { checkoutAsync, getTransaction, updateTransactions } from "../async/checkout";
import { ITransaction } from "../type/app";

const initialState = {
  transaction: {} as ITransaction,
  transactions: [] as ITransaction[],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        state.transaction = action.payload;
      })
      .addCase(checkoutAsync.rejected, (_, action) => {
        console.error("Failed to checkout:", action.error);
      })
      .addCase(checkoutAsync.pending, () => {
        console.log("Checkout in progress...");
      })
      .addCase(getTransaction.pending, () => {
        console.log("Fetching transactions...");
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(getTransaction.rejected, (_, action) => {
        console.error("Failed to fetch transactions:", action.error);
      })
      .addCase(updateTransactions.pending, () => {
        console.log("Updating transaction...");
      })
      .addCase(updateTransactions.fulfilled, (state, action) => {
        const updatedTransaction = action.payload;
        state.transactions = state.transactions.map((transaction) =>
          transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        );
        console.log("Transaction updated successfully.");
      })
      .addCase(updateTransactions.rejected, (_, action) => {
        console.error("Failed to update transaction:", action.error);
      });
  },
});

export default checkoutSlice.reducer;
