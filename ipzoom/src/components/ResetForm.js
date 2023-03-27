import "./ResetForm.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import ResetPassword from "../buttons/ResetPassword";
const ResetForm = () => {
  return (
    <div className="resetform-div">
      <div>
        <Link to="/">
          <img className="reset-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="resetform-main-div">
        <p className="reset-heading">Reset Password</p>
        <div className="reset-email-div">
          <p className="enter-email-text">Enter Email Address</p>
          <input type="email" className="enter-email-reset" required />
        </div>
        <Link to="/SetNewPassword">
          <ResetPassword></ResetPassword>
        </Link>
      </div>
    </div>
  );
};
export default ResetForm;
