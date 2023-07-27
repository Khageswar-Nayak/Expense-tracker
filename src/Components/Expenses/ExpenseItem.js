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
import { useSelector } from "react-redux";

const ExpenseItem = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  const expenseState = useSelector((state) => state.expense);
  const expenses = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  console.log(expenseState);
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
            <TableCell
              style={{
                backgroundColor: "#38015c",
                color: "white",
                fontWeight: "bold",
                width: "8rem",
              }}
            >
              Edit / Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses ? (
            expenses.map((expense) => (
              <TableRow
                key={expense.id}
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
                  {expense.title}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    backgroundColor: "gray",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {expense.category}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    backgroundColor: "gray",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {expense.amount}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    backgroundColor: "gray",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <button
                    className={classes.buttonOne}
                    onClick={() => props.onEdit(expense)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className={classes.buttonTwo}
                    onClick={() => expenseCtx.deleteExpense(expense)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              style={{
                backgroundColor: "gray",
                color: "white",
                fontWeight: "bold",
              }}
            ></TableRow>
          )}
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
              {totalAmount}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseItem;
