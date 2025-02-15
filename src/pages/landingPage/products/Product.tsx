import { Box, Card, CardContent, Typography } from "@mui/material";
import { useAppSelector, RootState, useAppDispatch } from "../../../redux";
import { useEffect } from "react";
import { deleteProducts, fetchProduct } from "../../../redux/async/products";
import { NavLink } from "react-router-dom";
import * as motion from "motion/react-client";
import Swal from "sweetalert2";

export const boxStyle = {
  width: "50px",
  height: "50px",
  background: "linear-gradient(135deg, #f2709c, #ff9472)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "10px",
};
const Product = () => {
  const mappingProduct = useAppSelector((state: RootState) => state.product.product);
  const dispatch = useAppDispatch();
  const profileUser = useAppSelector((state) => state.auth.profile);

  const handleDeleteProduct = (id: any) => {
    Swal.fire({
      title: "Are you sure want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProducts(id));
        dispatch(fetchProduct());
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    })
    // dispatch(deleteProducts(id));
  };

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  if (mappingProduct.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "50%", "50%", "20%", "20%"],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          style={boxStyle}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: "#613D2B",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Now Loading...
          </Typography>
        </motion.div>
      </div>
    );
  }

  return (
    <Box marginY={5} display={"flex"} gap={6}>
      {mappingProduct.map((item) => {
        let productImageSrc = "";

        if (typeof item.productPhoto === "string") {
          productImageSrc = item.productPhoto;
        } else if (item.productPhoto instanceof File) {
          productImageSrc = URL.createObjectURL(item.productPhoto);
        } else {
          productImageSrc = "/path/to/placeholder-image.jpg"; // Fallback for undefined or missing photos
        }

        return (
          <>
            <Box
              display={"flex flex-reverse"}
              sx={{
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              {profileUser.role === "SELLER" && (
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(item.id);
                  }}
                  sx={{ position: "absolute", zIndex: 50, borderRadius: "50%", backgroundColor: "gray", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                >
                  X
                </Box>
              )}
              <NavLink key={item.id} to={`/product/${item.id}`} style={{ fontStyle: "normal", textDecoration: "none" }}>
                <Card
                  key={item.id}
                  sx={{
                    height: 450,
                    width: 211,
                    bgcolor: "#F6E6DA",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <img src={productImageSrc} alt={item.nameProduct} style={{ width: "100%", height: "auto" }} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" color={"#613D2B"} fontWeight={"bold"}>
                      {item.nameProduct}
                    </Typography>
                    <Typography variant="body2" color={"#613D2B"}>
                      Rp.{item.price}{" "}
                    </Typography>
                    <Typography variant="body2" color={"#613D2B"}>
                      Stock: {item.stock}{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </NavLink>
            </Box>
          </>
        );
      })}
    </Box>
  );
};

export default Product;
