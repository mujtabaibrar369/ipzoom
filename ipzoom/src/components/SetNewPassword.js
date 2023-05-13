import "./SetNewPassword.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import SetPassword from "../buttons/SetPassword";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const SetNewPassword = () => {
  const token = useParams();
  const [pass, SetPass] = useState();
  const handleChange = (e) => {
    SetPass({ ...pass, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(token.resetToken);

    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if (password === confirmPassword) {
      const response = await axios.put(
        `http://localhost:5000/api/users/resetPassword/${token.resetToken}`,
        pass
      );
      toast.success(response.data);
    } else {
      toast.error("Password and confirm password does not matched");
    }
  };
  return (
    <div className="set-new-password-div">
      <div>
        <Link to="/">
          <img className="set-new-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="set-new-password-main">
        <p className="set-heading">Set New Password</p>
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="set-password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="set-confirm-password"
              id="confirmPassword"
              required
            />
          </div>
          <SetPassword></SetPassword>
        </form>
      </div>
    </div>
  );
};
export default SetNewPassword;
