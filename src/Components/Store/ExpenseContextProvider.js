// import React, { useCallback, useEffect, useState } from "react";
// import ExpenseContext from "./ExpenseContext";
// import { ToastContainer, toast } from "react-toastify";

// const ExpenseContextProvider = (props) => {
//   const [expenses, setExpenses] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);

//   // const fetchExpenseHandler = useCallback(async () => {
//   //   try {
//   //     const getExpense = await fetch(
//   //       "https://expense-tracker-33e64-default-rtdb.firebaseio.com/expenses.json"
//   //     );

//   //     const data = await getExpense.json();
//   //     let getToatalAmount = 0;
//   //     const loadedExpenses = [];
//   //     for (const key in data) {
//   //       getToatalAmount = getToatalAmount + Number(data[key].amount);
//   //       loadedExpenses.push({
//   //         id: key,
//   //         title: data[key].title,
//   //         amount: data[key].amount,
//   //         category: data[key].category,
//   //       });
//   //     }
//   //     console.log(data);

//   //     // setExpenses(loadedExpenses);
//   //     // setTotalAmount(getToatalAmount);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   fetchExpenseHandler();
//   // }, []);

//   const addExpenseHandler = async (expense, editingExpenseId) => {
//     console.log(editingExpenseId);
//     try {
//       if (editingExpenseId) {
//         const putExpense = await fetch(
//           `https://expense-tracker-33e64-default-rtdb.firebaseio.com/expenses/${editingExpenseId}.json`,
//           {
//             method: "PUT",
//             body: JSON.stringify(expense),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (putExpense.ok) {
//           const data = await putExpense.json();
//           const updatedExpenses = expenses.map((item) =>
//             item.id === editingExpenseId
//               ? { ...expense, id: editingExpenseId }
//               : item
//           );
//           setExpenses(updatedExpenses);
//           const updatedTotalAmount = expenses.map((item) =>
//             item.id === editingExpenseId
//               ? totalAmount - Number(item.amount)
//               : totalAmount
//           );

//           let updateTotalAmount = 0;
//           updatedExpenses.map((expense) => {
//             updateTotalAmount += Number(expense.amount);
//           });
//           setTotalAmount(updateTotalAmount);
//           const updateActionTotalAmount =
//             updatedTotalAmount + updatedExpenses.amount;

//           toast.success("Expense Edited Successfully", {
//             position: "top-right",
//             theme: "colored",
//             autoClose: 3000,
//           });
//         }
//       } else {
//         const postExpense = await fetch(
//           "https://expense-tracker-33e64-default-rtdb.firebaseio.com/expenses.json",
//           {
//             method: "POST",
//             body: JSON.stringify(expense),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (postExpense.ok) {
//           const data = await postExpense.json();
//           const updatEexpense = { ...expense, id: data.name };
//           // console.log(updatEexpense);
//           // setExpenses((prevExpense) => [...prevExpense, updatEexpense]);
//           // setTotalAmount(totalAmount + Number(updatEexpense.amount));

//           toast.success("Expense added Successfully", {
//             position: "top-right",
//             theme: "colored",
//             autoClose: 3000,
//           });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // console.log(expenses);

//   const deleteExpenseHandler = async (expense) => {
//     try {
//       const deleteExpense = await fetch(
//         `https://expense-tracker-33e64-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
//         {
//           method: "DELETE",
//         }
//       );
//       const updateExpense = expenses.filter(
//         (prevExpense) => prevExpense.id !== expense.id
//       );
//       const updatedTotalAmount = totalAmount - Number(expense.amount);
//       // setExpenses(updateExpense);
//       // setTotalAmount(totalAmount - Number(expense.amount));
//       // dispatch(expenseAction.deleteExpense(updateExpense, updatedTotalAmount));
//       toast.success("Expense Deleted Successfully", {
//         position: "top-right",
//         theme: "colored",
//         autoClose: 3000,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const contextValue = {
//     // expenses: expenses,
//     // totalAmount: totalAmount,
//     addExpenses: addExpenseHandler,
//     deleteExpense: deleteExpenseHandler,
//   };
//   return (
//     <ExpenseContext.Provider value={contextValue}>
//       {props.children}
//       <ToastContainer />
//     </ExpenseContext.Provider>
//   );
// };

// export default ExpenseContextProvider;
