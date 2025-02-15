import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findProfile, ILoginResponse, IProfileState } from "../async/auth";
import { loginAsync } from "../async/auth";

export interface IAuthState {
  isLogin: boolean;
  token: string;
  profile: IProfileState;
  user:
    | {
        id: string;
        email: string;
        fullName: string;
      }
    | undefined;

  isLoading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  isLogin: false,
  token: "",
  user: undefined,
  profile: {} as IProfileState,
  isLoading: false,
  error: "" || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<ILoginResponse>) => {
      state.isLogin = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    LOGOUT: (state) => {
      state.isLogin = false;
      state.token = "";
      state.user = undefined;
      state.profile = {} as IProfileState;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
        state.isLogin = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.error("Login failed", action);
        state.error = action.error.message || "Unknown error occurred";
        state.isLogin = false;
        state.token = "";
        state.user = undefined;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findProfile.fulfilled, (state, action) => {
        state.isLogin = true;
        state.profile = action.payload;
      })
      .addCase(findProfile.rejected, (state, action) => {
        console.log("Login failed", action);
        state.error = action.error.message || "Unknown error occurred";
        state.isLogin = false;
        state.token = "";
        state.user = undefined;
      })
      .addCase(findProfile.pending, (state, action) => {
        console.log(action);
        state.isLoading = true;
      });
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
