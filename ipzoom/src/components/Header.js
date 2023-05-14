import "./header.css";
import Logo from "./logo.png";
import Feature from "../buttons/Feature";
import Pricing from "../buttons/Pricing";
import Docs from "../buttons/Docs";
import Blog from "../buttons/Blog";
import SignUp from "../buttons/SignUp";
import Login from "../buttons/Login";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Logout from "../buttons/Logout";
import { toast } from "react-toastify";
import DashboardButton from "../buttons/DashboardButton";
import PayPalProButton from "../buttons/PayPalProButton";
const Header = (props) => {
  async function checkLogin() {
    const token = localStorage.getItem("AccessToken");
    let response = await axios.get(
      "http://localhost:5000/api/users/isLogedIn",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  const [status, setStatus] = useState();
  useEffect(() => {
    const token = localStorage.getItem("AccessToken");

    if (token) {
      setStatus(true);
      checkLogin();
    } else {
      setStatus(false);
    }
  }, []);

  if (status) {
    return (
      <div className="navbarDiv">
        <div className="header">
          <Link to="/">
            <img className="logo" src={Logo} alt="" />
          </Link>
        </div>
        <div className="navbar-buttons">
          <Feature></Feature>
          <Pricing></Pricing>
          <Docs></Docs>
          <Blog></Blog>
          <DashboardButton />
          <Logout />
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbarDiv">
        <div className="header">
          <Link to="/">
            <img
              className="logo"
              src={Logo}
              alt="Main-Logo"
              title="Go to Home"
            />
          </Link>
        </div>
        <div className="navbar-buttons">
          <Feature></Feature>
          <Pricing></Pricing>
          <Docs></Docs>
          <Blog></Blog>
          <SignUp></SignUp>
          <Login></Login>
        </div>
      </div>
    );
  }
};
export default Header;
