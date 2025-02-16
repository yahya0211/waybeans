import { useEffect, useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../lib";
import { useAppDispatch, useAppSelector } from "../../redux";
import { findProfile } from "../../redux/async/auth";
import { cartUser } from "../../redux/async/carts";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import UpdateProduct from "./UpdateProduct";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLogin = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [updateProductModal, setUpdateProductModal] = useState(false);

  const closeModalProduct = () => {
    setUpdateProductModal(false);
  };

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const response = await API.get(`/product/${id}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error: any) {
        if (error.response && error.response.data) {
          setError(error.response.data.message || "Error fetching product");
        } else {
          setError(error.message || "Error fetching product");
        }
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductId();
    }
  }, [id]);

  const handleAddCart = async () => {
    try {
      const data = {
        qty: 1,
        productId: id,
      };

      const addCart = await API.post(`/carts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(findProfile());
      dispatch(cartUser());
      navigate("/carts");
      return addCart;
    } catch (error: any) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return error;
    }
  };

  const handleOpenUpdateProduct = () => {
    setUpdateProductModal(true);
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh", flexDirection: "column", gap: "10px" }}>
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
        />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <Typography variant="h6" style={{ color: "#613D2B", fontWeight: "bold", letterSpacing: "1px" }}>
            Now Loading...
          </Typography>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <>
      <AnimatePresence>
        {isLogin.profile.role === "SELLER" && updateProductModal && (
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
            <Modal
              open={updateProductModal}
              onClose={closeModalProduct}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #613D2B" }}
            >
              <Box sx={{ bgcolor: "background.paper", p: 4, boxShadow: 24, borderRadius: 2, width: { xs: "90%", sm: "60%", md: "40%" } }}>
                <UpdateProduct closeModal={closeModalProduct} />
              </Box>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
      {product.stock === 0 && (
        <Typography variant="h6" style={{ color: "#613D2B", fontWeight: "bold", letterSpacing: "1px" }}>
          Product Sold Out
        </Typography>
      )}
      <Box display={"flex"} marginTop={3} marginX={15} gap={5} padding={3}>
        <Box>
          <img src={product.productPhoto} loading="lazy" alt={product.nameProduct || "picture"} style={{ height: 400 }} />
        </Box>
        <Box display={"flex"} flexDirection={"column"} padding={5}>
          <Typography variant="h4" color={"#613D2B"} fontWeight={"bold"} marginBottom={2}>
            {product.nameProduct}
          </Typography>
          <Typography variant="subtitle1" color={"#974A4A"}>
            Stock: {product.stock}
          </Typography>
          <Typography variant="subtitle2" color={"#000000"} marginBottom={2}>
            {product.description}
          </Typography>
          <Typography variant="h5" color={"#974A4A"} justifyContent={"flex-end"} textAlign={"right"} paddingTop={2} fontWeight={"bold"} marginBottom={2}>
            Rp.{product.price}
          </Typography>
          <Button
            sx={{
              backgroundColor: "#613D2B",
              color: "#ffffff",
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#4b2e1e",
              },
            }}
            onClick={isLogin.profile.role === "BUYER" ? handleAddCart : handleOpenUpdateProduct}
          >
            {isLogin.profile.role === "BUYER" ? "Add to Cart" : "Update Stock Product"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Product;
