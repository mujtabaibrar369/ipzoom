import "./PricingPlans.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import FreeSignUp from "../buttons/FreeSignUp";
import SubscribeNow from "../buttons/SubscribeNow";
import { useEffect, useState } from "react";
import SubscribeNowFree from "../buttons/SubscribeNowFree";
import SubscribeNowEnterprice from "../buttons/SubscribeNowEnterprice";
const PricingPlans = () => {
  const [Logged, setIsLogged] = useState();
  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });
  if (Logged) {
    return (
      <div className="pricing-div">
        <Header />
        <div className="plans">
          <div className="plan-div">
            <p className="free-text">Free</p>
            <p className="plan-specs">100 requests/day</p>
            <p className="developerLicense">Developer License</p>
          </div>
          <div className="plan-div">
            <p className="free-text">Professional</p>
            <p className="plan-specs">10,000 requests/day</p>
            <p className="plan-specs">Production License</p>
            <p className="ssl-text">SSL Included</p>
            <SubscribeNow />
          </div>
          <div className="plan-div">
            <p className="free-text">Enterprise</p>
            <p className="plan-specs">100,000 requests/day</p>
            <p className="plan-specs">Production License</p>
            <p className="ssl-text">SSL Included</p>
            <SubscribeNowEnterprice />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pricing-div">
        <Header />
        <div className="plans">
          <div className="plan-div">
            <p className="free-text">Free</p>
            <p className="plan-specs">100 requests/day</p>
            <p className="developerLicense">Developer License</p>
            <FreeSignUp />
          </div>
          <div className="plan-div">
            <p className="free-text">Professional</p>
            <p className="plan-specs">10,000 requests/day</p>
            <p className="plan-specs">Production License</p>
            <p className="ssl-text">SSL Included</p>
            <FreeSignUp />
          </div>
          <div className="plan-div">
            <p className="free-text">Enterprise</p>
            <p className="plan-specs">100,000 requests/day</p>
            <p className="plan-specs">Production License</p>
            <p className="ssl-text">SSL Included</p>
            <FreeSignUp />
          </div>
        </div>
      </div>
    );
  }
};
export default PricingPlans;
