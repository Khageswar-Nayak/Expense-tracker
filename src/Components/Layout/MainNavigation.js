import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { Button } from "react-bootstrap";

const MainNavigation = () => {
  const verifyEmailHandler = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAv-i3A29jJ85w1whdaMysK5Irng-pR8Oc",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("idToken"),
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
      console.log(err.response);
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Welcome to Expense Tracker</div>
      <nav>
        <ul>
          <li>
            <button>
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
    </header>
  );
};

export default MainNavigation;
