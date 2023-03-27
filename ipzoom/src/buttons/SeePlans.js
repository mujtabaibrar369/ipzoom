import "./SeePlans.css";
import { Link } from "react-router-dom";
const SeePlans = () => {
  return (
    <Link to="/pricing">
      <div className="seePlans">
        <button className="seePlan" type="submit">
          See Plans
        </button>
      </div>
    </Link>
  );
};
export default SeePlans;
