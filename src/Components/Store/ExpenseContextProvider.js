import React, { useCallback, useEffect, useState } from "react";
import ExpenseContext from "./ExpenseContext";

const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchExpenseHandler = useCallback(async () => {
    try {
      const getExpense = await fetch(
        "https://expense-tracker-33e64-default-rtdb.firebaseio.com/expenses.json"
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

      setExpenses(loadedExpenses);
      setTotalAmount(getToatalAmount);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchExpenseHandler();
  }, []);

  const addExpenseHandler = (expense, name) => {
    const updatEexpense = { ...expense, id: name };
    console.log(expense);
    setExpenses((prevExpense) => [...prevExpense, updatEexpense]);
    setTotalAmount(totalAmount + Number(updatEexpense.amount));
  };
  console.log(expenses);
  const contextValue = {
    expenses: expenses,
    totalAmount: totalAmount,
    addExpenses: addExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
