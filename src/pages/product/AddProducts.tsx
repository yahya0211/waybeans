import { Box, Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import { useState, useRef } from "react";
import { IoMdAttach } from "react-icons/io";
import { Close as CloseIcon } from "@mui/icons-material";
import { useProductsFunction } from "./useProductsFunction";
import { Controller } from "react-hook-form";
import { useProductValidation } from "../../lib/validation/useProductValidation";

const AddProducts = () => {
  const { control, reset, handleSubmit } = useProductValidation();
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null);
  const { onSubmit, onErrorSubmit } = useProductsFunction({ reset, imageFile: image?.file || null });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage({ file, preview: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => setImage(null);
  const handleAvatarClick = () => fileInputRef.current?.click();

  const submitProductData = async (data: any) => {
    const formData = new FormData();
    formData.append("nameProduct", data.nameProduct);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("description", data.description);
    if (image?.file) {
      formData.append("file", image.file);
    }

    try {
      const response = await fetch("http://localhost:8000/product/addProducts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      if (response.ok) {
        alert("Product added successfully!");
        reset();
        setImage(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <Grid container columnSpacing={20} px={10} marginTop={1}>
        <Grid item xs={6}>
          <Box padding={3} display={"flex"} flexDirection={"column"} gap={2}>
            <Typography variant="h4" fontWeight={"bold"} color={"#613D2B"}>
              Add Products
            </Typography>

            <Controller
              name="nameProduct"
              control={control}
              render={({ field }) => (
                <TextField
                  id="nameProduct-field"
                  sx={{ backgroundColor: "#613D2B40", "& .MuiOutlinedInput-root": { color: "#613D2B" } }}
                  label="Name"
                  variant="outlined"
                  type="text"
                  {...field}
                />
              )}
            />

            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <TextField
                  id="stock-field"
                  sx={{ backgroundColor: "#613D2B40", "& .MuiOutlinedInput-root": { color: "#613D2B" } }}
                  label="Stock"
                  variant="outlined"
                  type="number"
                  {...field}
                />
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  id="price-field"
                  sx={{ backgroundColor: "#613D2B40", "& .MuiOutlinedInput-root": { color: "#613D2B" } }}
                  label="Price"
                  variant="outlined"
                  type="number"
                  {...field}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  id="description-field"
                  multiline
                  rows={4}
                  fullWidth
                  sx={{ backgroundColor: "#613D2B40", "& .MuiOutlinedInput-root": { color: "#613D2B" } }}
                  label="Description"
                  variant="outlined"
                  type="text"
                  {...field}
                />
              )}
            />

            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    id="productPhoto-field"
                    ref={fileInputRef}
                    onChange={(event) => {
                      if (event.target.files && event.target.files.length > 0) {
                        const file = event.target.files[0];
                        field.onChange(file);
                        handleFileChange(event);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      justifyContent: "start",
                      color: "#613D2B",
                      backgroundColor: "#613D2B40",
                      "&:hover": { backgroundColor: "#613D2B40" },
                    }}
                    endIcon={<IoMdAttach />}
                    onClick={handleAvatarClick}
                  >
                    Add product image
                  </Button>
                </>
              )}
            />

            <Button
              variant="contained"
              sx={{ color: "white", marginTop: 2, width: "50%", backgroundColor: "#613D2B", "&:hover": { backgroundColor: "#613D2B" } }}
              onClick={handleSubmit(submitProductData, onErrorSubmit)}
            >
              Add Product
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          {image && (
            <Box position="relative" sx={{ width: "80%" }}>
              <img
                src={image.preview}
                alt="uploaded"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
              />
              <IconButton
                aria-label="delete"
                onClick={handleRemoveImage}
                size="small"
                sx={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProducts;
