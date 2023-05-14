import "./DashboardHeader.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import Logout from "../buttons/Logout";
import ApiDocs from "../buttons/ApiDocs";
import HomeButton from "../buttons/HomeButton";
const DashboardHeader = (props) => {
  return (
    <div className="dashboard-navbar">
      <div className="dashboard-header">
        <Link to="/">
          <img className="dashboard-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="dashboard-navbar-buttons">
        <Link to="/">
          <HomeButton />
        </Link>
        <ApiDocs></ApiDocs>
        <Logout></Logout>
      </div>
    </div>
  );
};
export default DashboardHeader;
