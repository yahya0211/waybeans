import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../redux";
import { LOGOUT } from "../../redux/slice/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const BuyerNavbar = () => {
  const dispatch = useAppDispatch();
  const cartLength = useAppSelector((state) => state.cart.cart.length);
  const profile = useAppSelector((state: RootState) => state.auth.profile);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(LOGOUT());
    location.reload();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box display={"flex"} gap={3}>
        <NavLink to="/carts" style={{ textDecoration: "none", color: "#613D2B", display: "flex", alignItems: "center" }}>
          <AddShoppingCartOutlined />
          <Typography sx={{ fontSize: "70%", fontWeight: "bold", color: "#613D2B" }}>{cartLength}</Typography>
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
            <Box display={"flex"} alignItems={"center"} gap={1} color={"red"}>
              <RiLogoutBoxRLine />
              <Typography textAlign="center" color={"black"}>
                Logout
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => navigate("/profile")}>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <FaRegUser />
              <Typography textAlign="center">Profile</Typography>
            </Box>
          </MenuItem>
         
        </Menu>
      </Box>
    </>
  );
};

export default BuyerNavbar;
