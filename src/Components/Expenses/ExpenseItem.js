import React, { useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import classes from "./ExpenseItem.module.css";
// import ExpenseContext from "../Store/ExpenseContext";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../store/expense-slice";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ExpenseItem = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const theme = useSelector((state) => state.theme.showTheme);
  const email = useSelector((state) => state.auth.email);

  const modifiedEmail = email.replace("@", "").replace(".", "");
  console.log(modifiedEmail);
  const fetchExpenseHandler = useCallback(async () => {
    try {
      const getExpense = await fetch(
        `https://expense-tracker-33e64-default-rtdb.firebaseio.com/${modifiedEmail}.json`
      );

      const data = await getExpense.json();
      let getToatalAmount = 0;
      const loadedExpenses = [];
      for (const key in data) {
        getToatalAmount = getToatalAmount + Number(data[key].amount);
        loadedExpenses.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
          category: data[key].category,
        });
      }
      console.log(data);
      dispatch(expenseAction.setExpense(loadedExpenses));
      // setExpenses(loadedExpenses);
      // setTotalAmount(getToatalAmount);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchExpenseHandler();
  }, []);

  const expenseDeleteHandler = async (expense) => {
    try {
      const deleteExpense = await fetch(
        `https://expense-tracker-33e64-default-rtdb.firebaseio.com/${modifiedEmail}/${expense.id}.json`,
        {
          method: "DELETE",
        }
      );
      // const updateExpense = expenses.filter(
      //   (prevExpense) => prevExpense.id !== expense.id
      // );
      dispatch(expenseAction.deleteExpense(expense));
      toast.success("Expense Deleted Successfully", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = ["Title", "Category", "Amount"];
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = String(row[header.toLowerCase()]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const downloadCSV = (csvData) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "expenses.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadHandler = () => {
    const csvData = convertToCSV(expenses);
    downloadCSV(csvData);
  };

  return (
    <>
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
                      onClick={() => expenseDeleteHandler(expense)}
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
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "1rem",
                }}
              >
                Subtotal
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "1rem",
                }}
              >
                {totalAmount}
              </TableCell>
              <TableCell>
                {theme && (
                  <Button
                    variant="primary"
                    size="sm"
                    style={{ float: "right" }}
                    onClick={downloadHandler}
                  >
                    Download
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </>
  );
};

export default ExpenseItem;
