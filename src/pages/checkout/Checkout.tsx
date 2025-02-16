import { Box, Button, Grid, TextField, Typography, styled } from "@mui/material";
import { IoMdAttach } from "react-icons/io";
import { useCheckoutValidation } from "../../lib/validation/useCheckoutValidation";
import { useCheckoutFunction } from "./useCheckoutFunction";
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useEffect, useState } from "react";
import { cartIdUser } from "../../redux/async/carts";
import { useParams } from "react-router-dom";

const Checkout = () => {
  const { control, reset, handleSubmit } = useCheckoutValidation();
  const { id } = useParams();
  const { onErrorSubmit, onSubmit } = useCheckoutFunction({ reset });
  const dispatch = useAppDispatch();
  const transactionUser = useAppSelector((state) => state.detailCart.cart);

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const dateState = transactionUser?.createdAt as Date;
  const date = new Date(dateState);
  const day = date.toLocaleDateString("en-GB", { weekday: "short" });
  const dateString = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const seperateRupiah = `Rp.${transactionUser?.product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  const totalTransaction = transactionUser?.totalPrice !== undefined ? `Rp.${transactionUser.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : "Rp.0";
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    dispatch(cartIdUser(id as string));
  }, [dispatch]);

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Grid container spacing={1} px={10} marginTop={3}>
          <Grid item xs={6} alignItems={"center"} justifyContent={"center"}>
            <Box padding={3} display={"flex"} flexDirection={"column"} gap={2}>
              <Typography variant="h4" fontWeight={"bold"} color={"#613D2B"}>
                Shipping
              </Typography>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField sx={{ backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="Name" variant="outlined" type="text" {...field} />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField sx={{ backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="Email" type="email" variant="outlined" {...field} />
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <TextField sx={{ backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="Phone" type="number" variant="outlined" {...field} />
                )}
              />

              <Controller
                control={control}
                name="postCode"
                render={({ field }) => (
                  <TextField sx={{ backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="PostCode" variant="outlined" {...field} />
                )}
              />

              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <TextField sx={{ backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="Address" variant="outlined" {...field} />
                )}
              />

              <Controller
                control={control}
                name="attachment"
                render={({ field }) => (
                  <>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      sx={{ justifyContent: "start", backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "&:hover": { backgroundColor: "#613D2B40" } }}
                      endIcon={<IoMdAttach />}
                    >
                      Attach of Transaction
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            setImageSrc(URL.createObjectURL(file));
                            field.onChange(file);
                          }
                        }}
                      />
                    </Button>
                    {imageSrc && <img src={imageSrc} alt="Preview" style={{ maxWidth: "100%", marginTop: "10px" }} />}
                  </>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={6} padding={3}>
            <>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%", borderRadius: 2, marginTop: 5, backgroundColor: "#F6E6DA", borderColor: "#F6E6DA", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }}
              >
                <Box display={"flex"} sx={{ gap: 2, width: "20%" }} padding={2}>
                  <img src={typeof transactionUser?.product?.productPhoto === "string" ? transactionUser.product.productPhoto : ""} alt="Preview" style={{ maxWidth: "100%", marginTop: "10px" }} />
                </Box>
                <Box justifyContent={"start"} padding={1} display={"flex"} flexDirection={"column"} sx={{ gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                      {" "}
                      {transactionUser?.product?.nameProduct}
                    </Typography>
                    <Typography variant="subtitle1">
                      <Box component="span" fontWeight="bold">
                        {day} {/* Hari */}
                      </Box>{" "}
                      <Box component="span" fontWeight="normal">
                        {dateString} {/* Tanggal */}
                      </Box>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                      {" "}
                      Price: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>{seperateRupiah}</span>
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                      {" "}
                      Qty: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>{transactionUser?.qty}</span>
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                      {" "}
                      Subtotal: <span style={{ color: "#613D2B", textTransform: "none", fontWeight: "normal" }}>{totalTransaction}</span>
                    </Typography>
                  </Box>
                </Box>
                <Box padding={1}>
                  <img src="/Icon.png" alt="icon" />
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{ color: "white", marginTop: 2, width: "100%", backgroundColor: "#613D2B", borderColor: "#613D2B", "&:hover": { backgroundColor: "#613D2B", color: "white" } }}
                onClick={handleSubmit(onSubmit, onErrorSubmit)}
              >
                pay
              </Button>
            </>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
