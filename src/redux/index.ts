import { configureStore } from "@reduxjs/toolkit/react";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/auth";
import productReducer from "./slice/products";
import cartReducer from "./slice/cart";
import cartDetailReducer from "./slice/cartDetail";
import checkoutReducer from "./slice/checkout";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    detailCart: cartDetailReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
