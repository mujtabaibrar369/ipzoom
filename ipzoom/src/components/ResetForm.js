import "./ResetForm.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import ResetPassword from "../buttons/ResetPassword";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ResetForm = () => {
  const [formData, setFormData] = useState();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/users/forgotPassword",
      formData
    );
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="resetform-div">
      <div>
        <Link to="/">
          <img className="reset-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="resetform-main-div">
        <form onSubmit={submitHandler}>
          <p className="reset-heading">Reset Password</p>
          <div className="reset-email-div">
            <p className="enter-email-text">Enter Email Address</p>
            <input
              type="email"
              className="enter-email-reset"
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <ResetPassword></ResetPassword>
        </form>
      </div>
    </div>
  );
};
export default ResetForm;
