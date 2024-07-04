import { Box, Card, CardContent, Typography } from "@mui/material";
import { useAppSelector, RootState, useAppDispatch } from "../../../redux";
import { useEffect } from "react";
import { fetchProduct } from "../../../redux/async/products";
import { NavLink } from "react-router-dom";

const Product = () => {
  const mappingProduct = useAppSelector((state: RootState) => state.product.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  if (!Array.isArray(mappingProduct) || mappingProduct.length === 0) {
    return <Typography>No products available</Typography>;
  }

  return (
    <Box marginTop={5} display={"flex"} gap={6}>
      {mappingProduct.map((item) => (
        <NavLink key={item.id} to={`/product/${item.id}`} style={{ fontStyle: "normal", textDecoration: "none" }}>
          <Card
            key={item.id}
            sx={{
              height: 450,
              width: 230,
              bgcolor: "#F6E6DA",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <img src={item.productPhoto} alt={item.nameProduct} style={{ width: "100%", height: "auto" }} />
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
      ))}
    </Box>
  );
};

export default Product;
