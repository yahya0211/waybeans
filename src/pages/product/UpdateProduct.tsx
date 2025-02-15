import { Box, TextField, InputLabel, Button } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { updateProducts, fetchProductId } from "../../redux/async/products";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

const UpdateProduct = ({ closeModal }: any) => {
  const dispatch = useAppDispatch();
  const { id: productId } = useParams();
  const product = useAppSelector((state) => state.product.productDetail);
  const { control, handleSubmit, setValue } = useForm({ defaultValues: { price: 0, stock: 0 } });

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductId(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setValue("price", product.price || 0);
      setValue("stock", product.stock || 0);
    }
  }, [product, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("price", String(data.price));
      formData.append("stock", String(data.stock));

      console.log("Submitting FormData:");
      formData.forEach((value, key) => console.log(key, value));

      const res = await dispatch(updateProducts({ id: productId as string, data })).unwrap();
      console.log("Server response:", res);

      // closeModal();
      // alert("Product updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update product");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <Box>
        <InputLabel sx={{ mb: 1 }}>Update Price</InputLabel>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField {...field} type="number" fullWidth variant="outlined" onChange={(e) => field.onChange(e.target.value)} />
          )}
        />
      </Box>
      <Box>
        <InputLabel sx={{ mb: 1 }}>Update Stock</InputLabel>
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <TextField {...field} type="number" fullWidth variant="outlined" onChange={(e) => field.onChange(e.target.value)} />
          )}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button type="submit" variant="contained" color="primary">Update</Button>
        <Button onClick={closeModal} variant="outlined" color="secondary">Cancel</Button>
      </Box>
    </Box>
  );
};
export default UpdateProduct;
