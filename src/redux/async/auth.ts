import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, setAuthToken } from "../../lib";
import { ITransaction } from "../type/app";
import { toast } from "react-toastify";

interface ILoginState {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    photoProfile: string;
  };
}

export interface IProfileState {
  id: string;
  email: string;
  fullName: string;
  photoProfile: string;
  role: string;
  cart: {
    id: string;
    userId: string;
    productId: string;
    qty: number;
    totalPrice: number;
    createdAt: Date;
    updaetdAt?: Date;
    deletedAt?: Date;
  };
  transaction: ITransaction[];
}

export const loginAsync = createAsyncThunk<ILoginResponse, ILoginState, { rejectValue: string }>("auth/login", async (props, { rejectWithValue }) => {
  try {
    const { data } = await API.post("auth/login", props);

    const token = data.accessToken;
    const user = data.user;
    setAuthToken(token);
    localStorage.setItem("token", token);

    return { token, user };
  } catch (error) {
    const err = error as string;
    toast.error("Invalid Credentials", { autoClose: 3000, theme: "colored", position: "top-center" });
    return rejectWithValue(err);
  }
});

export const findProfile = createAsyncThunk<IProfileState, void, { rejectValue: string }>("auth/check", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.get("auth/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    setAuthToken();
    localStorage.removeItem("token");
    return rejectWithValue("error");
  }
});

export const dataTransactions = createAsyncThunk<IProfileState, void, { rejectValue: string }>("auth/check", async (_, { rejectWithValue }) => {
  try {
    setAuthToken();
    const { data } = await API.get("auth/check", {
      headers: {
        Authorization: `Bearer ${setAuthToken()}`,
      },
    });

    return data.cart;
  } catch (error) {
    return rejectWithValue("error");
  }
});
