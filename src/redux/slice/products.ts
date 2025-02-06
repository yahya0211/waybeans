import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addProducts, fetchProduct, fetchProductId } from "../async/products";
import { IProduct, IProductState } from "../type/app";

const initialState: IProductState = {
  product: [],
  productDetail: {
    id: "",
    description: "",
    nameProduct: "",
    price: 0,
    productPhoto: "", 
    stock: 0,
    qty: 0,
  },
  error: null,
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ADD_PRODUCTS: (state, action: PayloadAction<IProduct>) => {
      state.product = [...state.product, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.isLoading = false;
        state.error = null;
        state.product = action.payload;
        console.log("action.payload", action.payload);
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error to fetch products";
        console.log("rejected:", action);
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(fetchProductId.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.isLoading = false;
        state.error = null;
        state.productDetail = action.payload;
        console.log("action.payload", action.payload);
      })
      .addCase(fetchProductId.rejected, (state, action) => {
        state.isLoading = false;
        console.log("rejected:", action);
        console.log("action.error.message", action.error.message);
        state.error = action.error.message || "Error to fetch product detail";
      })
      .addCase(fetchProductId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProducts.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.isLoading = false;
        state.error = null;
        state.product = [...state.product, action.payload]; // Add new product to list
        console.log("Product added successfully:", action.payload);
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error to fetch product detail";
        console.log("rejected:", action.payload);
      })
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      });
  },
});

export const { ADD_PRODUCTS } = productSlice.actions;
export default productSlice.reducer;
