import { AppBar, Box, Container, Grid, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../redux";
import { useEffect } from "react";
import { findProfile } from "../../redux/async/auth";
import BuyerNavbar from "./BuyerNavbar";
import SellerNavbar from "./SellerNavbar";

const Navbar = () => {
  const reduxCarts = useAppSelector((state) => state.cart);

  const token = localStorage.getItem("token");
  const profile = useAppSelector((state: RootState) => state.auth.profile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(findProfile());
  }, [dispatch, token, reduxCarts]);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "transparent",
        padding: 2,
        marginBottom: 3,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <NavLink to={"/"}>
                <img src="/src/imagesSource/Icon.png" alt="Logo" style={{ height: "100%", width: "100%" }} />
              </NavLink>
            </Grid>
            {!token ? (
              <Grid item>
                <Box display="flex" gap={2}>
                  <NavLink
                    to="/auth/login"
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: "#613D2B",
                      height: "30px",
                      width: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      border: "1px solid #613D2B",
                      backgroundColor: isActive ? "#EDE0D4" : "transparent",
                    })}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDE0D4")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    style={() => ({
                      textDecoration: "none",
                      color: "#FFFFFF",
                      height: "30px",
                      width: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      backgroundColor: "#613D2B",
                      border: "1px solid #613D2B",
                      transition: "background-color 0.2s ease",
                    })}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4b2e1e")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#613D2B")}
                  >
                    Register
                  </NavLink>
                </Box>
              </Grid>
            ) : (
              <>
                {profile?.role === "BUYER" && <BuyerNavbar />}
                {profile?.role === "SELLER" && <SellerNavbar />}
              </>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
