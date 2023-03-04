import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="loginDiv">
      <button className="loginButton" type="submit">
        <Link to="/login" className="login-link">
          Login
        </Link>
      </button>
    </div>
  );
};
export default Login;
