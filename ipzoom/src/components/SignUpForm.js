import "./SignUpForm.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import SignUpSubmit from "../buttons/SignUpSubmit";
const SignUpForm = () => {
  return (
    <div className="signupform-div">
      <div>
        <Link to="/">
          <img className="signup-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="signupform-main-div">
        <p className="sign-up-heading">Sign Up</p>
        <input
          type="text"
          placeholder="Enter First Name"  
          className="enter-credentials"
          required
        />
        <input
          type="text"
          placeholder="Enter Last Name"  
          className="enter-credentials"
          required
        />
        <input
          type="email"
          placeholder="Enter Email Address"  
          className="enter-credentials"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"  
          className="enter-credentials"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"  
          className="confirm-password"
          required
        />
        <SignUpSubmit></SignUpSubmit>
        <div className="terms-privacy-div">
          <p>By signing up, you agree to the
            <span><a className="terms-link" href="#"> Terms of Service </a></span> and 
            <span><a className="privacy-link" href="#"> Privacy Policy</a></span>
          </p>
        </div>
      </div>
      <div>
        <p className="dont-text">Already have an account? 
          <Link to="/login"><span><a className="dont-link" href="#"> Log In</a></span></Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpForm;
