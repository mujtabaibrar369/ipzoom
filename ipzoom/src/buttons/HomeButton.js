// import { Link } from "react-router-dom";
import "./HomeButton.css";
const HomeButton = () => {
  return (
    <div className="homeDiv">
      {/* <Link to="/dashboard"> */}
        <button className="homeButton" type="submit">
          Home
        </button>
      {/* </Link> */}
    </div>
  );
};
export default HomeButton;
