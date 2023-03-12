import "./LoginForm.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import LoginSubmit from "../buttons/LoginSubmit";
const LoginForm = () => {
  return (
    <div className="loginform-div">
      <div>
        <Link to="/">
          <img className="login-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="loginform-main-div">
        <p className="sign-in-heading">Login</p>
        <p className="sign-in-hint">Login with Ip Zoom Account</p>
        <input
          type="email"
          placeholder="Enter Email Address"  
          className="enter-email-login"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"  
          className="enter-password-login"
          required
        />
        <LoginSubmit></LoginSubmit>
        <div className="forgot-div">
          <Link to="/reset">
            <a className="forgot-link">Forgot Password</a>
          </Link>
        </div>
      </div>
      <div>
        <p className="dont-text">Don’t have an account? 
          <Link to="/signup"><span><a className="dont-link" href="#"> Sign Up</a></span></Link>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
