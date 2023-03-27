import { Link } from "react-router-dom";
import "./DashboardButton.css";
const DashboardButton = () => {
  return (
    <div className="dashDiv">
      <Link to="/dashboard">
        <button className="dashButton" type="submit">
          Dashboard
        </button>
      </Link>
    </div>
  );
};
export default DashboardButton;
