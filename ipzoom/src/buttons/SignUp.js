import { Link } from "react-router-dom";
import "./SignUp.css";
const SignUp = () => {
  return (
    <div className="signUpDiv">
      <button className="signUpButton" type="submit">
        <Link to="/signup" className="signup-link">
          SignUp
        </Link>
      </button>
    </div>
  );
};
export default SignUp;
