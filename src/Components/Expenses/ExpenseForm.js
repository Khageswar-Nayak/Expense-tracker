import classes from "./ExpenseForm.module.css";
import ExpenseContext from "../Store/ExpenseContext";
import React, { useState, useContext, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

const ExpenseForm = (props) => {
  const [addExpense, setAddExpense] = useState(false);
  const titleInputRef = useRef("");
  const amountInputRef = useRef("");
  const categoryInputRef = useRef("");

  const expenseCtx = useContext(ExpenseContext);
  //   console.log(expenseCtx);

  const formHideHandler = (event) => {
    event.preventDefault();
    setAddExpense(false);
  };
  const addExpenseHandler = async (event) => {
    event.preventDefault();
    const expense = {
      title: titleInputRef.current.value,
      amount: amountInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    // console.log(expense);
    try {
      const postExpense = await fetch(
        "https://expense-tracker-33e64-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (postExpense.ok) {
        const data = await postExpense.json();
        expenseCtx.addExpenses(expense, data.name);
        toast.success("Expense added Successfully", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    titleInputRef.current.value = "";
    amountInputRef.current.value = "";
    categoryInputRef.current.value = "Food";
  };

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes["form-title"]}>Add Daily Expenses</h1>
        {addExpense && (
          <form>
            <div className={classes["main-expense-info"]}>
              <div className={classes["expense-input-box"]}>
                <label>Expense title :</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  ref={titleInputRef}
                />
              </div>
              <div className={classes["expense-input-box"]}>
                <label>Expense Amount :</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  ref={amountInputRef}
                />
              </div>
              <div className={classes["expense-input-box"]}>
                <label>Category :</label>
                <select ref={categoryInputRef}>
                  <option>Food</option>
                  <option>Petrol</option>
                  <option>Rent</option>
                </select>
              </div>
            </div>
            <div className={classes["form-submit-btn"]}>
              <input type="submit" value="Submit" onClick={addExpenseHandler} />
              <input type="submit" value="Close" onClick={formHideHandler} />
            </div>
          </form>
        )}
        {!addExpense && (
          <button onClick={() => setAddExpense(true)}>Add</button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ExpenseForm;
