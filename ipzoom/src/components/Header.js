import "./header.css";
import Logo from "./logo.png";
import Feature from "../buttons/Feature";
import Pricing from "../buttons/Pricing";
import Docs from "../buttons/Docs";
import Blog from "../buttons/Blog";
import SignUp from "../buttons/SignUp";
import Login from "../buttons/Login";
import { Link } from "react-router-dom";
const Header = (props) => {
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
};
export default Header;
