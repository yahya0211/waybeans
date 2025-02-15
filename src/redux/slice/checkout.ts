import { createSlice } from "@reduxjs/toolkit";
import { checkoutAsync, getTransaction, updateTransactions } from "../async/checkout";
import { ITransaction } from "../type/app";

const initialState = {
  transaction: {} as ITransaction,
  transactions: [] as ITransaction[],
  isLoading: false,
  error: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    updateTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        state.transaction = action.payload;
      })
      .addCase(checkoutAsync.rejected, (state, action) => {
        state.error = action.error.message || "Unknown error occurred";
      })
      .addCase(checkoutAsync.pending, (action) => {
        action.isLoading = true;
      })
      .addCase(getTransaction.pending, (action) => {
        action.isLoading = true;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.error = action.error.message || "Unknown error occurred";
      })
      .addCase(updateTransactions.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(updateTransactions.fulfilled, (state, action) => {
        const updatedTransaction = action.payload;
        state.transactions = state.transactions.map((transaction) => (transaction.id === updatedTransaction.id ? updatedTransaction : transaction));
        state.isLoading = false;
        state.error = "";
      })
      .addCase(updateTransactions.rejected, (state, action) => {
        state.error = action.payload || "Unknown error occurred";
        state.isLoading = false;
      });
  },
});

export default checkoutSlice.reducer;
