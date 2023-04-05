import "./PricingPlans.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import FreeSignUp from "../buttons/FreeSignUp";
const PricingPlans = () => {
  return (
    <div className="pricing-div">
      <Header />
      <div className="plans">
        <div className="plan-div">
          <p className="free-text">Free</p>
          <p className="plan-specs">100 requests/day</p>
          <p className="developerLicense">Developer License</p>
          <Link to="/signup">
            <FreeSignUp />
          </Link>
        </div>
        <div className="plan-div">
          <p className="free-text">Professional</p>
          <p className="plan-specs">10,000 requests/day</p>
          <p className="plan-specs">Production License</p>
          <p className="ssl-text">SSL Included</p>
          <Link to="/signup">
            <FreeSignUp />
          </Link>
        </div>
        <div className="plan-div">
          <p className="free-text">Enterprise</p>
          <p className="plan-specs">100,000 requests/day</p>
          <p className="plan-specs">Production License</p>
          <p className="ssl-text">SSL Included</p>
          <Link to="/signup">
            <FreeSignUp />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PricingPlans;
