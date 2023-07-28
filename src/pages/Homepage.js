import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import ExpenseForm from "../Components/Expenses/ExpenseForm";
import ExpenseItem from "../Components/Expenses/ExpenseItem";

const Homepage = () => {
  const [editExpense, setEditExpense] = useState({});
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const editExpenseHandler = (expense) => {
    // console.log(expense);
    setEditExpense(expense);
    setEditingExpenseId(expense.id);
  };
  console.log("editExpense", editExpense);
  console.log("editingExpenseId", editingExpenseId);
  const removeEditExpenseHandler = () => {
    setEditExpense({});
    setEditingExpenseId(null);
  };

  return (
    <>
      <Layout />
      <ExpenseForm
        editExpense={editExpense}
        editingExpenseId={editingExpenseId}
        onRemove={removeEditExpenseHandler}
      />
      <ExpenseItem onEdit={editExpenseHandler} />
    </>
  );
};

export default Homepage;
