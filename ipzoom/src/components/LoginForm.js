import "./LoginForm.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import LoginSubmit from "../buttons/LoginSubmit";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

const LoginForm = () => {
  const [status, setStatus] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          formData
        );
        if (response.data.AccessToken) {
          const decoded = jwt_decode(response.data.AccessToken);
          console.log(decoded);
          if (decoded.id) {
            localStorage.setItem("AccessToken", response.data.AccessToken);
            toast.success("User Logged in Successfully");
            window.location.href = "/";
          }
        } else {
          toast.error("Invalid Credentials");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    return (
      <div className="loginform-div">
        <div>
          <Link to="/">
            <img className="login-logo" src={Logo} alt="" />
          </Link>
        </div>
        <div className="loginform-main-div">
          <p className="sign-in-heading">Login</p>
          <p className="sign-in-hint">Login with Ip Zoom Account</p>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="enter-email-login"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="enter-password-login"
              name="password"
              onChange={handleChange}
              required
            />
            <LoginSubmit></LoginSubmit>
          </form>
          <div className="forgot-div">
            <Link to="/reset">
              <a className="forgot-link">Forgot Password</a>
            </Link>
          </div>
        </div>
        <div>
          <p className="dont-text">
            Don’t have an account?
            <Link to="/signup">
              <span>
                <a className="dont-link" href="#">
                  {" "}
                  Sign Up
                </a>
              </span>
            </Link>
          </p>
        </div>
      </div>
    );
  }
};
export default LoginForm;
