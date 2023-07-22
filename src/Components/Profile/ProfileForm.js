import React, { useRef } from "react";
import classes from "./ProfileForm.module.css";
import { Button } from "react-bootstrap";

const ProfileForm = () => {
  const fullnameInputRef = useRef("");
  const photoURLinputRef = useRef("");
  const updateHandler = async (event) => {
    event.preventDefault();

    const enteredFullName = fullnameInputRef.current.value;
    const enteredPhotoURL = photoURLinputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAv-i3A29jJ85w1whdaMysK5Irng-pR8Oc",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("tokenId"),
            displayName: enteredFullName,
            photoUrl: enteredPhotoURL,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={classes.profile}>
      <p>Contact Details</p>
      <Button variant="outline-danger" size="sm">
        Cancel
      </Button>
      <form className={classes.form}>
        <i className="bi bi-github"></i>
        <label>Full Name :</label>
        <input ref={fullnameInputRef} />
        <span>
          <i className="bi bi-globe"></i>
          <label>Profile Photo URL:</label>
          <input ref={photoURLinputRef} />
        </span>
      </form>
      <Button
        variant="success"
        size="sm"
        style={{ float: "left", marginTop: "2rem" }}
        onClick={updateHandler}
      >
        Update
      </Button>
    </div>
  );
};

export default ProfileForm;