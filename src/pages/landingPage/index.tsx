import { Fragment } from "react/jsx-runtime";
import { Box } from "@mui/material";
import Product from "./products/Product";

const LandingPage = () => {
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
