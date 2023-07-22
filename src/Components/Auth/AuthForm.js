import React, { useEffect, useState } from "react";
import classes from "./AuthForm.module.css";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [sectionHeight, setSectionHeight] = useState("18rem");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setSectionHeight((prevState) =>
      prevState === "18rem" ? "21rem" : "18rem"
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
      !isLogin &&
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
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAv-i3A29jJ85w1whdaMysK5Irng-pR8Oc";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAv-i3A29jJ85w1whdaMysK5Irng-pR8Oc";
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
          if (!data.registered && !isLogin) {
            console.log("User has successfully signed up");
            setIsLogin(true);
            setSectionHeight((prevState) =>
              prevState === "21rem" ? "18rem" : "21rem"
            );
            toast.success("You can Login now", {
              position: "top-right",
              theme: "colored",
              autoClose: 3000,
            });
          }

          if (data.registered) {
            navigate("/home");
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
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

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
        {!isLogin && (
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

        <Button variant="info" onClick={submitHandler}>
          Submit
        </Button>
        {isLogin && (
          <p>
            don't have an account ?{" "}
            <button className={classes.button} onClick={switchAuthModeHandler}>
              Sign Up
            </button>
          </p>
        )}
        {!isLogin && (
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
