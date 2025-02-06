import { Box, Typography, Select, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useEffect } from "react";
import { getTransaction } from "../../redux/async/checkout";
import { updateTransactions } from "../../redux/async/checkout";

const STATUS_OPTIONS = ["WAITING_APPROVE", "SHIPPED", "IN_TRANSIT", "DELIVERED", "RETURNED", "CANCELLED"];

const Income = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.checkout.transactions);

  useEffect(() => {
    dispatch(getTransaction());
  }, [dispatch]);

  const handleStatusChange = (transactionId: string, newStatus: string) => {
    dispatch(updateTransactions({ id: transactionId, status: newStatus }));
  };

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
                <TableCell align="center">{transaction.product ? transaction.product.nameProduct : "No Product Info"}</TableCell>
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
