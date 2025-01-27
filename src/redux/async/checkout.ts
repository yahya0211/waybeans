import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";
import { ITransaction } from "../type/app";

interface CheckoutPayload {
  id: string;
  data: ITransaction[];
}

export const checkoutAsync = createAsyncThunk<ITransaction, CheckoutPayload, { rejectValue: string }>("checkout", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await API.post(`/transaction/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    window.open(response.data.redirect_url, "_blank");
    
    return response.data;
  } catch (error: any) {
    console.error("Error during checkout:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message || "Unknown error occurred");
  }
});

// export const fetchCheckout = createAsyncThunk<ITransaction[], void, { rejectValue: string }>("checkout", async (_, { rejectWithValue }) => {
//   try {
     
//   } catch (error) {
    
//   }
// })