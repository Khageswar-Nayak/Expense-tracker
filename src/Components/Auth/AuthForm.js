import React, { useState } from "react";
import classes from "./AuthForm.module.css";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

const AuthForm = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.isLoggedIn);
  console.log(login);

  // const [isLogin, setIsLogin] = useState(true);
  const [sectionHeight, setSectionHeight] = useState("19rem");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    dispatch(authActions.setLogin());
    setSectionHeight((prevState) =>
      prevState === "19rem" ? "21rem" : "19rem"
    );
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Input fields are mendatory to fill", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
      });
    } else if (
      !login &&
      confirmPassword.length > 0 &&
      confirmPassword !== password
    ) {
      toast.error("Password doesn't match", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
      });
    } else {
      let url;
      if (login) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBQiCiD7VDuM-neK1Kj4vs9C3NMeUL8js";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBQiCiD7VDuM-neK1Kj4vs9C3NMeUL8js";
      }

      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          if (!data.registered && !login) {
            console.log("User has successfully signed up");
            // dispatch(authActions.login(data));
            dispatch(authActions.setLogin());
            setSectionHeight((prevState) =>
              prevState === "21rem" ? "19rem" : "21rem"
            );
            toast.success("You can Login now", {
              position: "top-right",
              theme: "colored",
              autoClose: 3000,
            });
          }

          if (data.registered) {
            navigate("/home");

            dispatch(authActions.login(data));
          }
          // authCtx.login(data.idToken);

          // history.replace("/profile");
        } else {
          const data = await res.json();

          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          console.log(data);

          throw new Error(errorMessage);
        }
      } catch (err) {
        toast.error(err.message, {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <section className={classes.auth} style={{ height: sectionHeight }}>
      <h1>{login ? "Login" : "Sign Up"}</h1>

      <Form>
        <Form.Floating>
          <Form.Control
            id="floatingInputCustom"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating>
          <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
        {!login && (
          <Form.Floating>
            <Form.Control
              id="floatingConfirmPassword"
              type="password"
              placeholder="Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </Form.Floating>
        )}
        {login && (
          <Link style={{ textDecoration: "none" }} to="/forgetpassword">
            forget password ?
          </Link>
        )}
        <br />
        <Button variant="info" onClick={submitHandler}>
          Submit
        </Button>
        {login && (
          <p>
            don't have an account ?{" "}
            <button className={classes.button} onClick={switchAuthModeHandler}>
              Sign Up
            </button>
          </p>
        )}
        {!login && (
          <p>
            have an account ?
            <button className={classes.button} onClick={switchAuthModeHandler}>
              Sign In
            </button>
          </p>
        )}
      </Form>
      <ToastContainer />
    </section>
  );
};

export default AuthForm;
