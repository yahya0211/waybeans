import { AppBar, Box, Container, Grid, Toolbar, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../redux";
import * as React from "react";
import { useEffect } from "react";
import { AddShoppingCartOutlined, PersonOffOutlined } from "@mui/icons-material";
import { findProfile } from "../../redux/async/auth";
import { LOGOUT } from "../../redux/slice/auth";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const profile = useAppSelector((state: RootState) => state.auth.profile);
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClick = (e: any) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleLogout = () => {
    dispatch(LOGOUT());
    navigate("/");
    location.reload();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    dispatch(findProfile());
  }, [token]);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "transparent",
        padding: 2,
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
              <Box display={"flex"} gap={2}>
                <NavLink to="/cart">
                  <AddShoppingCartOutlined />
                </NavLink>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={profile.photoProfile} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
