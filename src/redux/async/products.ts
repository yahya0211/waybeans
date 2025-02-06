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

export const addProducts = createAsyncThunk<IProduct, FormData, { rejectValue: string }>("addProduct", async (formData, { rejectWithValue }) => {
  try {
    const response = await API.post("/product/addProducts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to add products");
  }
});
