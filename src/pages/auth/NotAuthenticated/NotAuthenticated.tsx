import { Box, Typography } from "@mui/material";

const NotAuthenticated = () => {
  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <img src="/warning.png" alt="" width={"200px"} height={"200px"} />
        <Typography variant="h3" fontWeight={"bold"}>
          Is that you Bro? Why you doesn't login?
        </Typography>
      </Box>
    </>
  );
};
export default NotAuthenticated;
