import { Link } from "react-router-dom";
import "./Pricing.css";
const Pricing = () => {
  return (
    <div className="pricingDiv">
      <button className="pricingButton" type="submit">
        <Link to="/pricing" className="pricing-link">
          Pricing
        </Link>
      </button>
    </div>
  );
};
export default Pricing;
