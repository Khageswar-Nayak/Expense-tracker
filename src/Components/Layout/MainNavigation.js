import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
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
    </header>
  );
};

export default MainNavigation;
