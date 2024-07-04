import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";
import { ICart } from "../type/app";

export const cartUser = createAsyncThunk<ICart[], void, { rejectValue: string }>("cart", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.get("/carts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const cartIdUser = createAsyncThunk<ICart, string, { rejectValue: string }>("cart", async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await API.get("/cart/findId/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(data);
    return data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
