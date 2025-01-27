import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useEffect } from "react";
import { cartUser } from "../../redux/async/carts";

const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const cartItems = useAppSelector((state) => state.cart);
  console.log("cartItems:", cartItems);

  const dispatch = useAppDispatch();
  const transactionUser = useAppSelector((state) => state.auth.profile.transaction);
  console.log("transaction user:", transactionUser?.map((transaction) => transaction?.cartId));

  const transactionDates =
    transactionUser?.map((transaction) => {
      if (!transaction?.createdAt) {
        return "Invalid Date"; // Tanggal tidak tersedia
      }

      const date = new Date(transaction.createdAt);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }) ?? [];

  // `Rp.${transactionUser?.product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  // transactionUser?.totalPrice !== undefined ? `Rp.${transactionUser.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : "Rp.0";
  const totalTransaction = "hello";
  useEffect(() => {
    dispatch(cartUser());
  }, [dispatch]);

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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" fontWeight={"bold"} color={"#613D2B"}>
            My Transaction
          </Typography>
          {transactionUser?.map((transaction, index) => (
            <Box
              key={index}
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ width: "100%", borderRadius: 2, marginTop: 2, backgroundColor: "#F6E6DA", borderColor: "#F6E6DA", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }}
            >
              <Box display={"flex"} sx={{ gap: 2, width: "20%" }} padding={2}>
                <img src={cartItems.cart.find((item) => item.id === transaction?.cartId)?.product?.productPhoto} style={{ width: "100%", height: "100%" }} alt="" />
              </Box>
              <Box justifyContent={"start"} padding={1} display={"flex"} flexDirection={"column"} sx={{ gap: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={"bold"}>
                    {" "}
                   {cartItems.cart.find((item)=> item.id === transaction?.cartId)?.product?.nameProduct}
                  </Typography>
                  <Typography variant="subtitle1">
                    <Box component="span" fontWeight="bold">
                      {cartItems.cart.find((item) => item.id === transaction?.cartId)?.product?.price}
                    </Box>{" "}
                    <Box component="span" fontWeight="normal">
                      "Hello" {/* Tanggal */}
                    </Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={"bold"}>
                    {" "}
                    Price: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>Rp.{transaction?.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={"bold"}>
                    {" "}
                    Qty: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>{cartItems.cart.find((item) => item.id === transaction?.cartId)?.qty}</span>
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={"bold"}>
                    {" "}
                    Subtotal: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>Rp.{cartItems.cart.find((item) => item.id === transaction?.cartId)?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
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
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
