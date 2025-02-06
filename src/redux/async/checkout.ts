import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";
import { ITransaction } from "../type/app";

interface CheckoutPayload {
  id: string;
  data: ITransaction;
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
    window.open(response.data.payment.redirect_url, "_blank");

    return response.data.payment.redirect_url;
  } catch (error: any) {
    console.error("Error during checkout:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message || "Unknown error occurred");
  }
});

export const getTransaction = createAsyncThunk<ITransaction[], void, { rejectValue: string }>("transaction", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const { data } = await API.get("/transaction/buyer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Error during checkout:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message || "Unknown error occurred");
  }
});

export const updateTransactions = createAsyncThunk<ITransaction, { id: string; status: string }, { rejectValue: string }>("transaction/update", async ({ id, status }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const { data } = await API.patch(
      `/transaction/update/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("Error during transaction update:", error);
    return rejectWithValue(error.response?.data || error.message || "Unknown error occurred");
  }
});
