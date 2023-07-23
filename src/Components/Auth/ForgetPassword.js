import React, { useState } from "react";
import classes from "./ForgetPassword.module.css";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  CircularProgress,
  Backdrop,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [modalEmail, setModalEmail] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const resetPasswordHandler = async () => {
    try {
      const resetPassword = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAv-i3A29jJ85w1whdaMysK5Irng-pR8Oc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resetPassword.ok) {
        const data = await resetPassword.json(); // Parse JSON data from the response
        console.log(data);
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
          setModalEmail(data.email);
          setOpen(true);
        }, 2000);
      } else {
        toast.error("Invlid_Email", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      }
      setEmail("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Form className={classes.form}>
        <i className="bi bi-key-fill" style={{ fontSize: "2rem" }}></i>
        <h2>Forgot password?</h2>
        <p>No worries, we'll send you reset instructions.</p>
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
        <Button
          variant="info"
          size="sm"
          className={classes.buttonOne}
          style={{ fontWeight: "bold" }}
          onClick={resetPasswordHandler}
        >
          Reset password
        </Button>
        <br />
        <Link to="/">
          <button className={classes.buttonTwo}>
            <i className="bi bi-arrow-left"></i> Back to Login
          </button>
        </Link>
        {loader && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                A password reset link has been sent to {modalEmail}
              </Typography>
              <Button style={{ float: "right" }} onClick={() => setOpen(false)}>
                ok
              </Button>
            </Box>
          </Modal>
        )}
      </Form>
    </>
  );
};

export default ForgetPassword;
