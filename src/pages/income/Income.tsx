import { Box, Typography, Select, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useEffect, useState } from "react";
import { getTransaction } from "../../redux/async/checkout";
import { updateTransactions } from "../../redux/async/checkout";
import * as motion from "motion/react-client";
import { boxStyle } from "../landingPage/products/Product";

const STATUS_OPTIONS = ["WAITING_APPROVE", "SHIPPED", "IN_TRANSIT", "DELIVERED", "RETURNED", "CANCELLED"];

const Income = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.checkout.transactions);
  console.log(transactions);

  const handlingState = useAppSelector((state) => state.checkout);
  const [isLoading, setIsLoading] = useState(true);
  const handleStatusChange = (transactionId: string, newStatus: string) => {
    dispatch(updateTransactions({ id: transactionId, status: newStatus }));
    location.reload();
  };

  useEffect(() => {
    dispatch(getTransaction());
    setIsLoading(false);
  }, [dispatch]);

  if (handlingState.isLoading && isLoading === true) {
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
    <Box display={"flex"} flexDirection={"column"} marginX={15} marginTop={10} gap={2}>
      <Typography variant="h4" fontWeight={"bold"} color={"#613D2B"}>
        Income Transactions
      </Typography>
      <TableContainer component={Paper} sx={{ height: "50vh", border: "1px solid black" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#dcdcdc" }}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Postcode</TableCell>
              <TableCell align="center">Product Order</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="center">{transaction.name}</TableCell>
                <TableCell align="center">{transaction.address}</TableCell>
                <TableCell align="center">{transaction.postCode}</TableCell>
                <TableCell align="center">{transaction.product ? transaction.product.nameProduct : ""}</TableCell>
                <TableCell align="center">
                  <Select value={transaction.status} onChange={(e) => handleStatusChange(transaction.id, e.target.value)}>
                    {STATUS_OPTIONS.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Income;
