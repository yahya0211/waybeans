import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useEffect, useState } from "react";
import { cartUser } from "../../redux/async/carts";
import { fetchProduct } from "../../redux/async/products";
import * as motion from "motion/react-client";
import { boxStyle } from "../landingPage/products/Product";

const Profile = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const cartUsers = useAppSelector((state) => state.cart.cart);
  const loadingProfile = useAppSelector((state) => state.cart.loading);
  const [isLoading, setIsLoading] = useState(true);

  const transactionUser = useAppSelector((state) => state.auth.profile.transaction);

  const product = useAppSelector((state) => state.product.product);

  const transactionDates =
    transactionUser?.map((transaction) => {
      if (!transaction?.createdAt) {
        return "Invalid Date";
      }

      const date = new Date(transaction.createdAt);
      return date.toLocaleDateString("en-GB", {
        weekday: "short",
      });
    }) ?? [];

  const dateTransaction =
    transactionUser?.map((transaction) => {
      if (!transaction?.createdAt) {
        return "Invalid Date";
      }

      const date = new Date(transaction.createdAt);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }) ?? [];

  useEffect(() => {
    setIsLoading(false);
    dispatch(cartUser());
    dispatch(fetchProduct());
  }, [dispatch]);

  if (isLoading && loadingProfile === true) {
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
    <>
      <Box padding={5} paddingX={10} sx={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(2, 1fr)" }}>
        <Box sx={{ display: "flex", alignItems: "start", flexDirection: "row", gap: 1 }}>
          <Box gap={1} sx={{ display: "flex", flexDirection: "column" }} width={"40%"}>
            <Typography variant="h4" fontWeight={"bold"} color={"#613D2B"}>
              My Profile
            </Typography>
            <img src={profile?.photoProfile} width={"75%"} alt="" />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography color={"#613D2B"}>Full Name: </Typography>
              <Typography>{profile?.fullName}</Typography>
            </Box>
            <Box>
              <Typography color={"#613D2B"}>Email: </Typography>
              <Typography>{profile?.email}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h4" fontWeight={"bold"} color={"#613D2B"}>
            My Transaction
          </Typography>
          <Box sx={{ overflowY: "scroll", display: "flex", flexDirection: "column", gap: 2, maxHeight: "50vh", paddingY: 2, paddingRight: 2 }}>
            {transactionUser?.map((transaction, index) => {
              const cartItem = Array.isArray(cartUsers) ? cartUsers.find((cart) => cart.id === transaction.cartId) : null;
              return (
                <Box
                  key={index}
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ width: "100%", borderRadius: 2, marginTop: 2, backgroundColor: "#F6E6DA", borderColor: "#F6E6DA", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }}
                >
                  <Box display={"flex"} sx={{ gap: 2, width: "20%" }} padding={2}>
                    {product?.map((product) => {
                      if (product.id === transaction?.productId) {
                        const imageUrl = typeof product.productPhoto === "string" ? product.productPhoto : undefined;
                        return <img key={product.id} src={imageUrl} style={{ width: "100%", height: "100%" }} alt="" />;
                      }
                    })}
                  </Box>
                  <Box justifyContent={"start"} padding={1} display={"flex"} flexDirection={"column"} sx={{ gap: 2 }}>
                    <Box>
                      {product?.map((product) => {
                        if (product.id === transaction?.productId) {
                          return (
                            <Typography key={product.id} variant="subtitle1" fontWeight={"bold"}>
                              {product.nameProduct}
                            </Typography>
                          );
                        }
                      })}
                      <Typography variant="subtitle1">
                        <Box component="span" fontWeight="bold">
                          {transactionDates[index]}
                        </Box>{" "}
                        <Box component="span" fontWeight="normal">
                          {dateTransaction[index]}
                        </Box>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={"bold"}>
                        Price: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>Rp.{transaction?.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={"bold"}>
                        Qty: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>{cartItem?.qty ?? "N/A"}</span>
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={"bold"}>
                        Subtotal: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>{cartItem?.totalPrice?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") ?? "N/A"}</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box padding={1} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                    <img src="/Icon.png" alt="icon" />
                    <Typography
                      color={transaction.status === "WAITING_APPROVE" ? "#613D2B" : transaction.status === "CANCELLED" ? "red" : transaction.status === "RETURNED" ? "red" : transaction.status === "DELIVERED" ? "green" : "blue"}
                      padding={1}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor:
                          transaction.status === "WAITING_APPROVE" ? "#E0C4B3" : transaction.status === "CANCELLED" ? "#FADBD8" : transaction.status === "RETURNED" ? "#FADBD8" : transaction.status === "DELIVERED" ? "#D5F5E3" : "#AED6F1",
                      }}
                    >
                      {transaction.status}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
