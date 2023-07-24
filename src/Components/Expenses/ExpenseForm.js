import classes from "./ExpenseForm.module.css";
import ExpenseContext from "../Store/ExpenseContext";
import React, { useState, useContext, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ExpenseForm = (props) => {
  const [addExpense, setAddExpense] = useState(false);
  const [defaultTitle, setDefaultTitle] = useState("");
  const [defaultAmount, setDefaultAmount] = useState("");
  const [defaultCategory, setDefaultCategory] = useState("");
  const titleInputRef = useRef("");
  const amountInputRef = useRef("");
  const categoryInputRef = useRef("");

  const expenseCtx = useContext(ExpenseContext);
  // console.log(props.editExpense);
  useEffect(() => {
    if (props.editExpense) {
      setAddExpense(true);
      setDefaultTitle(props.editExpense.title);
      setDefaultAmount(props.editExpense.amount);
      setDefaultCategory(props.editExpense.category);
    }
  }, [props.editExpense]);

  useEffect(() => {
    setAddExpense(false);
  }, []);

  const formHideHandler = (event) => {
    event.preventDefault();
    setAddExpense(false);
  };
  const addExpenseHandler = (event) => {
    event.preventDefault();
    const expense = {
      title: titleInputRef.current.value,
      amount: amountInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    // console.log(expense);
    expenseCtx.addExpenses(expense, props.editingExpenseId);
    props.onRemove();

    setDefaultTitle("");
    setDefaultAmount("");
    setDefaultCategory("");

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
                  defaultValue={defaultTitle}
                />
              </div>
              <div className={classes["expense-input-box"]}>
                <label>Expense Amount :</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  ref={amountInputRef}
                  defaultValue={defaultAmount}
                />
              </div>
              <div className={classes["expense-input-box"]}>
                <label>Category :</label>
                <select ref={categoryInputRef} defaultValue={defaultCategory}>
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
