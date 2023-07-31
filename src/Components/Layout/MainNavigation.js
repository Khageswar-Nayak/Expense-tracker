import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DarkMode from "../DarkMode/DarkMode";
import { themeAuction } from "../../store/theme-slice";
import { useEffect, useState } from "react";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.auth.token);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const expenses = useSelector((state) => state.expense.expenses);
  const theme = useSelector((state) => state.theme);
  const showPremium = localStorage.getItem("showPremium") || "";
  const [premium, setPremium] = useState(showPremium);

  const logoutHandler = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("idToken");
  };

  useEffect(() => {
    if (
      totalAmount > 10000 &&
      localStorage.getItem("showPremium") !== "donotShow"
    ) {
      localStorage.setItem("showPremium", "show");
      setPremium("show");
    }
  }, []);

  const verifyEmailHandler = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCy4qHPIUIpvcVirbLTHyoqXjq5SoN-QcU",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
            requestType: "VERIFY_EMAIL",
          }),
          headers: {
            // Change 'header' to 'headers'
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json(); // Parse JSON data from the response
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const premiumHandler = () => {
    localStorage.setItem("showPremium", "donotShow");
    dispatch(themeAuction.setTheme());
    setPremium("donotShow");
    alert(
      "Now you can change the theme into dark and also you can download your list of expenses"
    );
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Expense Tracker</div>
      <nav>
        <ul>
          <li>
            <button style={{ backgroundColor: "#38015c" }}>
              your profile is incomplete.
              <Link className={classes.link} to="/profile">
                Complete now
              </Link>
            </button>
          </li>
        </ul>
      </nav>
      <Button
        variant="warning"
        size="sm"
        onClick={verifyEmailHandler}
        style={{ color: "black" }}
      >
        Verify Email
      </Button>
      {premium === "show" && (
        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "blue" }}
          onClick={premiumHandler}
        >
          Active Premium
        </Button>
      )}
      {theme && premium === "donotShow" && <DarkMode />}

      <Link to="/">
        <Button variant="danger" size="sm" onClick={logoutHandler}>
          Logout
        </Button>
      </Link>
    </header>
  );
};

export default MainNavigation;
