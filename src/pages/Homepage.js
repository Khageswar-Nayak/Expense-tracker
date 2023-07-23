import React from "react";
import Layout from "../Components/Layout/Layout";
import ExpenseForm from "../Components/Expenses/ExpenseForm";
import ExpenseItem from "../Components/Expenses/ExpenseItem";

const Homepage = () => {
  return (
    <>
      <Layout />
      <ExpenseForm />
      <ExpenseItem />
    </>
  );
};

export default Homepage;
