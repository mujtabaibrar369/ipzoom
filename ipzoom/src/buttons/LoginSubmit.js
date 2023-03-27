import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginSubmit.css";
const LoginSubmit = () => {
  const [status, setStatus] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, []);
  if (status) {
    return (
      <Link to="/">
        <div className="login-submit-div">
          <button className="login-submit-button" type="submit">
            Login
          </button>
        </div>
      </Link>
    );
  } else {
    return (
      <div className="login-submit-div">
        <button className="login-submit-button" type="submit">
          Login
        </button>
      </div>
    );
  }
};
export default LoginSubmit;
