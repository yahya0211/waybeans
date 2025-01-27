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
      <Box margin={10} marginTop={5}>
        <Box>
          <img src="/src/imagesSource/Jumbotron.png" alt="" width={"1048px"} height={"402px"} />
        </Box>
        <Product />
      </Box>
    </Fragment>
  );
};

export default LandingPage;
