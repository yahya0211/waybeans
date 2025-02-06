import { Fragment } from "react/jsx-runtime";
import { Box } from "@mui/material";
import Product from "./products/Product";
import { useAppDispatch } from "../../redux";
import { useEffect } from "react";
import { cartUser } from "../../redux/async/carts";

const LandingPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartUser());
  }, [dispatch]);

  return (
    <Fragment>
      <Box marginX={14}>
        <Box>
          <img src="/src/imagesSource/Jumbotron.png" alt="jumbotron" width={"100%"} />
        </Box>
        <Product />
      </Box>
    </Fragment>
  );
};

export default LandingPage;
