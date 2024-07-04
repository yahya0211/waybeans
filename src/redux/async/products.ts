import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../type/app";
import { API } from "../../lib";

export const fetchProduct = createAsyncThunk<IProduct[], void, { rejectValue: string }>("product", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/product");
    const products = response.data;
    return products;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch products");
  }
});

export const fetchProductId = createAsyncThunk<IProduct, string, { rejectValue: string }>("product/${}", async (id, { rejectWithValue }) => {
  try {
    const response = await API.get(`/product/${id}`);
    const products = response.data;
    return products;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch products");
  }
});
