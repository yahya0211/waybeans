import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";
import { ICart } from "../type/app";

export const cartUser = createAsyncThunk<ICart[], void, { rejectValue: string }>(
  "cart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const { data } = await API.get("/carts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!Array.isArray(data)) {
        throw new Error("API did not return an array");
      }

      return data;
    } catch (error: any) {
      console.error("Error fetching carts:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message || "Unknown error occurred");
    }
  }
);


export const cartIdUser = createAsyncThunk<ICart, string, { rejectValue: string }>("cart", async (id: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const { data } = await API.get("/carts/findId/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    console.error("Error fetching cart by ID:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message || "Unknown error occurred");
  }
});
