import { Link } from "react-router-dom";
import "./Docs.css";
const Docs = () => {
  return (
    <div className="docsDiv">
      <button className="docsButton" type="submit">
        <Link to="/apidocs" className="pricing-link">
          Docs
        </Link>
      </button>
    </div>
  );
};
export default Docs;
