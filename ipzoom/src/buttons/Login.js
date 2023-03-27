import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <Link to="/login" className="login-link">
      <div className="loginDiv">
        <button className="loginButton" type="submit">
          Login
        </button>
      </div>
    </Link>
  );
};
export default Login;
