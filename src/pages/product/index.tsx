import { Fragment, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../lib";
import { useAppDispatch, useAppSelector } from "../../redux";
import { findProfile } from "../../redux/async/auth";
import { cartUser } from "../../redux/async/carts";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLogin } = useAppSelector((state) => state.auth);
  const data = "";
  const dispatch = useAppDispatch();

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

  const navigate = useNavigate();
  const handleAddCart = async () => {
    try {
      const addCart = await API.post(`carts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
        },
      });

      dispatch(findProfile());
      dispatch(cartUser());
      navigate("/cart");
      return addCart;
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Typography>Loading.....</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!product) {
    // Check if product is null
    return <Typography>Product not found</Typography>;
  }

  return (
    <Fragment>
      <Navbar />
      <Box display={"flex"} marginTop={3} marginX={15} gap={5} padding={3}>
        <Box>
          <img src={product.productPhoto} alt={product.nameProduct || "picture"} style={{ height: 400 }} />
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
            onClick={isLogin ? () => handleAddCart() : () => navigate(`/auth/login`)}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Product;
