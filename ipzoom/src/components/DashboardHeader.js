import "./DashboardHeader.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import DashboardButton from "../buttons/DashboardButton";
import Logout from "../buttons/Logout";
import ApiDocs from "../buttons/ApiDocs";
const DashboardHeader = (props) => {
  return (
    <div className="dashboard-navbar">
      <div className="dashboard-header">
        <Link to="/">
          <img className="dashboard-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="dashboard-navbar-buttons">
        <DashboardButton></DashboardButton>
        <ApiDocs></ApiDocs>
        <Logout></Logout>
      </div>
    </div>
  );
};
export default DashboardHeader;
