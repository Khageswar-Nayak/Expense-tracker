import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const MainNavigation = () => {
  const idToken = useSelector((state) => state.auth.token);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const logoutHandler = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("idToken");
  };
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
      <Button variant="warning" size="sm" onClick={verifyEmailHandler}>
        Verify Email
      </Button>
      <Link to="/">
        <Button variant="primary" size="sm" onClick={logoutHandler}>
          Logout
        </Button>
      </Link>
      {totalAmount > 10000 ? (
        <Button variant="primary" size="sm" style={{ backgroundColor: "blue" }}>
          Active Premium
        </Button>
      ) : (
        <></>
      )}
    </header>
  );
};

export default MainNavigation;
