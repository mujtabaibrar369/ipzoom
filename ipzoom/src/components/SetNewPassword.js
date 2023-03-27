import "./SetNewPassword.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import SetPassword from "../buttons/SetPassword";
const SetNewPassword = () => {
  return (
    <div className="set-new-password-div">
      <div>
        <Link to="/">
          <img className="set-new-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="set-new-password-main">
        <p className="set-heading">Set New Password</p>
        <div>
            <input
            type="password"
            placeholder="Enter Password"  
            className="set-password"
            required
            />
            <input
            type="password"
            placeholder="Confirm Password"  
            className="set-confirm-password"
            required
            />
        </div>
            <SetPassword></SetPassword>
      </div>
    </div>
  );
};
export default SetNewPassword;
