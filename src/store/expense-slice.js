import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  totalAmount: 0,
};

const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    setExpense(state, action) {
      // console.log(action.payload);
      state.expenses = action.payload;
      state.totalAmount = action.payload.reduce(
        (total, expense) => total + Number(expense.amount),
        0
      );
    },
    addExpense(state, action) {
      console.log(state.expenses);
      state.expenses.push(action.payload);
      state.totalAmount += Number(action.payload.amount);
    },
    updateExpense(state, action) {
      state.expenses = action.payload;
      state.totalAmount = action.payload.reduce(
        (total, expense) => total + Number(expense.amount),
        0
      );
    },
    deleteExpense(state, action) {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.totalAmount -= Number(state.expenses[index].amount);
        state.expenses.splice(index, 1);
      }
    },
  },
});

console.log(initialExpenseState);
export const expenseAction = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
