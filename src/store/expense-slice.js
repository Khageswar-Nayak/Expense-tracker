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
      console.log(action);
      state.expenses = action.payload.loadedExpenses;
      state.totalAmount = action.payload.getToatalAmount;
    },
    addExpense(state, action) {
      console.log(action.payload.amount);
      state.expenses.push(action.payload);
      state.totalAmount += Number(action.payload.amount);
    },
    updateExpense(state, action) {
      state.expenses = action.payload.updatedExpenses;
      state.totalAmount = action.payload.updateActionTotalAmount;
    },
    deleteExpense(state, action) {
      state.expenses = action.payload.updateExpense;
      state.totalAmount = action.payload.updatedTotalAmount;
    },
  },
});

console.log(initialExpenseState);
export const expenseAction = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
