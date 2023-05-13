import "./SignUpForm.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import SignUpSubmit from "../buttons/SignUpSubmit";
import { useState, useEffect } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState();
  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, []);
  if (status) {
    window.location.href = "/";
  } else {
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const submitHandler = async (e) => {
      e.preventDefault();

      const password = document.getElementById("password").value || "";
      const confirmPassword =
        document.getElementById("confirmPassword").value || "";
      if (password === confirmPassword) {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/users/register",
            formData
          );
          console.log(data);
          if (data.AccessToken) {
            console.log(data.AccessToken);
            localStorage.setItem("AccessToken", data.AccessToken);
            toast.success("User Register Successfully");
            window.location.href = "/";
          } else {
            console.log(data);
            toast.error(data);
          }
        } catch (error) {
          toast.error(error.message);
          console.log(error.message);
        }
      } else {
        toast.error("Password and confirm-Password must be same");
      }
    };
    return (
      <div className="signupform-div">
        <div>
          <Link to="/">
            <img className="signup-logo" src={Logo} alt="" />
          </Link>
        </div>
        <div className="signupform-main-div">
          <p className="sign-up-heading">Sign Up</p>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter First Name"
              className="enter-credentials"
              name="firstName"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              className="enter-credentials"
              name="lastName"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Enter Email Address"
              className="enter-credentials"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="enter-credentials"
              name="password"
              id="password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="confirm-password"
              name="confirmPassword"
              onChange={handleChange}
              id="confirmPassword"
              required
            />
            <SignUpSubmit></SignUpSubmit>
          </form>
          <div className="terms-privacy-div">
            <p>
              By signing up, you agree to the
              <span>
                <a className="terms-link" href="localhost:3000">
                  {" "}
                  Terms of Service{" "}
                </a>
              </span>{" "}
              and
              <span>
                <a className="privacy-link" href="localhost:3000">
                  {" "}
                  Privacy Policy
                </a>
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="alreadyText">
            Already have an account?
            <Link to="/login">
              <a className="dont-link" href="localhost:3000">
                Log In
              </a>
            </Link>
          </p>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    );
  }
};
export default SignUpForm;
