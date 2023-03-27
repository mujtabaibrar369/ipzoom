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
    return (
      <div className="navbar">
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
          {/* <PayPalProButton /> */}
          <Logout />
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
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
          <SignUp></SignUp>
          <Login></Login>
        </div>
      </div>
    );
  }
};
export default Header;
