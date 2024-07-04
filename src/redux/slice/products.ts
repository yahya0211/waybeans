import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProduct, fetchProductId } from "../async/products";
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
  },
  error: null,
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.isLoading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error to fetch products";
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductId.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.isLoading = false;
        state.error = null;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error to fetch product detail";
      })
      .addCase(fetchProductId.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default productSlice.reducer;
