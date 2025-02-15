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

export const deleteProducts = createAsyncThunk<IProduct, string, { rejectValue: string }>("deleteProduct", async (id, { rejectWithValue }) => {
  try {
    const response = await API.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to delete products");
  }
});

export const updateProducts = createAsyncThunk<IProduct, { id: string; data: any }, { rejectValue: string }>("updateProduct", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await API.patch(`/product/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to update products");
  }
});
