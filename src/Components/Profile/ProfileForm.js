import React, { useEffect, useRef } from "react";
import classes from "./ProfileForm.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const idToken = useSelector((state) => state.token);
  const fullnameInputRef = useRef("");
  const photoURLinputRef = useRef("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCy4qHPIUIpvcVirbLTHyoqXjq5SoN-QcU",

          {
            method: "POST",
            body: JSON.stringify({
              idToken: idToken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(getData);
        if (!getData.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await getData.json();
        // console.log(data.users[0].displayName);
        fullnameInputRef.current.value = data.users[0].displayName;
        photoURLinputRef.current.value = data.users[0].photoUrl;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const updateHandler = async (event) => {
    event.preventDefault();

    const enteredFullName = fullnameInputRef.current.value;
    const enteredPhotoURL = photoURLinputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCy4qHPIUIpvcVirbLTHyoqXjq5SoN-QcU",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
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
      <Link to="/home">
        <Button variant="outline-danger" size="sm">
          Cancel
        </Button>
      </Link>
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
