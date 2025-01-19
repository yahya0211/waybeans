import { Box, Grid, Input, TextField, Typography } from "@mui/material";

const Checkout = () => {
  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Grid container spacing={1} border={1} px={10} marginTop={3}>
          <Grid item xs={6} border={1} alignItems={"center"} justifyContent={"center"}>
            <Box padding={3} display={"flex"} flexDirection={"column"} gap={2}>
              <Typography variant="h4" fontWeight={"bold"} color={"#613D2B"}>
                Shipping
              </Typography>
              <TextField sx={{ width: "100%", backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="Name" variant="outlined" />
              <TextField sx={{ width: "100%", backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="Email" variant="outlined" />
              <TextField sx={{ width: "100%", backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="Phone" variant="outlined" />
              <TextField sx={{ width: "100%", backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="PostCode" variant="outlined" />
              <TextField sx={{ width: "100%", backgroundColor: "#613D2B40", borderColor: "#613D2B", color: "#613D2B", "& .MuiOutlinedInput-root": { color: "#613D2B" } }} id="outlined-basic" label="Address" variant="outlined" />
              <Input></Input>
            </Box>
          </Grid>
          <Grid item xs={6} border={1}>
            <>xs=4</>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
