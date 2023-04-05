import "./Subscribe.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
const Subscribe = () => {
  return (
    <div className="subscribeDiv">
      <div>
        <Link to="/">
          <img className="subscribeLogo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="subscribeMain">
        <p className="subscribeHeading">Subscribe</p>
      </div>
    </div>
  );
};
export default Subscribe;
