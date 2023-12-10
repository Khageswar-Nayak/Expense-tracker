import classes from "./ExpenseForm.module.css";
// import ExpenseContext from "../Store/ExpenseContext";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../store/expense-slice";
const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const email = useSelector((state) => state.auth.email);
  const modifiedEmail = email.replace("@", "").replace(".", "");

  const [addExpense, setAddExpense] = useState(false);
  const titleInputRef = useRef("");
  const amountInputRef = useRef("");
  const categoryInputRef = useRef("");

  // const expenseCtx = useContext(ExpenseContext);

  useEffect(() => {
    if (props.editExpense) {
      setAddExpense(true);
    }
  }, [props.editExpense]);

  useEffect(() => {
    setAddExpense(false);
  }, []);

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
    try {
      if (props.editingExpenseId) {
        // expenseCtx.addExpenses(expense, props.editingExpenseId);
        const putExpense = await fetch(
          `https://expense-tracker-b8752-default-rtdb.firebaseio.com/${modifiedEmail}/${props.editingExpenseId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(expense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (putExpense.ok) {
          const data = await putExpense.json();
          const updatedExpenses = expenses.map((item) =>
            item.id === props.editingExpenseId
              ? { ...expense, id: props.editingExpenseId }
              : item
          );
          dispatch(expenseAction.updateExpense(updatedExpenses));
          props.onRemove();

          toast.success("Expense Edited Successfully", {
            position: "top-right",
            theme: "colored",
            autoClose: 3000,
          });
        }
      } else {
        // expenseCtx.addExpenses(expense, null);

        const postExpense = await fetch(
          `https://expense-tracker-b8752-default-rtdb.firebaseio.com/${modifiedEmail}.json`,
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
          const updatEexpense = { ...expense, id: data.name };
          // console.log(updatEexpense);
          dispatch(expenseAction.addExpense(updatEexpense));
          toast.success("Expense added Successfully", {
            position: "top-right",
            theme: "colored",
            autoClose: 3000,
          });
        }
      }

      titleInputRef.current.value = "";
      amountInputRef.current.value = "";
      categoryInputRef.current.value = "Food";
      setAddExpense(false);
    } catch (error) {
      console.log(error);
    }
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
                  defaultValue={props.editExpense.title}
                />
              </div>
              <div className={classes["expense-input-box"]}>
                <label>Expense Amount :</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  ref={amountInputRef}
                  defaultValue={props.editExpense.amount}
                />
              </div>
              <div className={classes["expense-input-box"]}>
                <label>Category :</label>
                <select
                  ref={categoryInputRef}
                  defaultValue={props.editExpense.category}
                >
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
