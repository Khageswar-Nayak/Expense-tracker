import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./ExpenseItem.module.css";
import ExpenseContext from "../Store/ExpenseContext";

const ExpenseItem = () => {
  const expenseCtx = useContext(ExpenseContext);
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#38015c",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Title
            </TableCell>
            <TableCell
              align="right"
              style={{
                backgroundColor: "#38015c",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Category
            </TableCell>
            <TableCell
              align="right"
              style={{
                backgroundColor: "#38015c",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenseCtx.expenses.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {row.title}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {row.category}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {row.amount}
              </TableCell>
            </TableRow>
          ))}
          <TableRow
            style={{
              backgroundColor: "#38015c",
            }}
          >
            <TableCell />
            <TableCell
              style={{ color: "white", fontWeight: "bolder", fontSize: "1rem" }}
            >
              Subtotal
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "white", fontWeight: "bolder", fontSize: "1rem" }}
            >
              {expenseCtx.totalAmount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseItem;
