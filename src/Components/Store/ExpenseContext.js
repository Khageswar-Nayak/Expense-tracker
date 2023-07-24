import React from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  totalAmount: 0,
  addExpenses: (expense) => {},
  deleteExpense: () => {},
});
export default ExpenseContext;
