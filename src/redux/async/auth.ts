import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, setAuthToken } from "../../lib";

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
}

export const loginAsync = createAsyncThunk<ILoginResponse, ILoginState, { rejectValue: string }>("auth/login", async (props, { rejectWithValue }) => {
  try {
    const { data } = await API.post("auth/login", props);
    console.log("data", data);

    const token = data.accessToken;
    const user = data.user;
    setAuthToken(token);
    localStorage.setItem("token", token);
    console.log("user", user);

    return { token, user };
  } catch (error) {
    const err = error as string;
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
