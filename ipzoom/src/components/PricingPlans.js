import "./PricingPlans.css";
import Header from "./Header";
import FreeSignUp from "../buttons/FreeSignUp";
import React, { useEffect, useState } from "react";
// import FreeSignUp from "../buttons/FreeSignUp";
// import SubscribeNow from "../buttons/SubscribeNow";
// import { useEffect, useState } from "react";
// import SubscribeNowFree from "../buttons/SubscribeNowFree";
// import SubscribeNowEnterprice from "../buttons/SubscribeNowEnterprice";
// const PricingPlans = () => {
//   const [Logged, setIsLogged] = useState();
//   useEffect(() => {
//     const token = localStorage.getItem("AccessToken");
//     if (token) {
//       setIsLogged(true);
//     } else {
//       setIsLogged(false);
//     }
//   });
//   if (Logged) {
//     return (
//       <div className="pricing-div">
//         <Header />
//         <div className="plans">
//           <div className="plan-div">
//             <p className="free-text">Free</p>
//             <p className="plan-specs">100 requests/day</p>
//             <p className="developerLicense">Developer License</p>
//           </div>
//           <div className="plan-div">
//             <p className="free-text">Professional</p>
//             <p className="plan-specs">10,000 requests/day</p>
//             <p className="plan-specs">Production License</p>
//             <p className="ssl-text">SSL Included</p>
//             <SubscribeNow />
//           </div>
//           <div className="plan-div">
//             <p className="free-text">Enterprise</p>
//             <p className="plan-specs">100,000 requests/day</p>
//             <p className="plan-specs">Production License</p>
//             <p className="ssl-text">SSL Included</p>
//             <SubscribeNowEnterprice />
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="pricing-div">
//         <Header />
//         <div className="plans">
//           <div className="plan-div">
//             <p className="free-text">Free</p>
//             <p className="plan-specs">100 requests/day</p>
//             <p className="developerLicense">Developer License</p>
//             <FreeSignUp />
//           </div>
//           <div className="plan-div">
//             <p className="free-text">Professional</p>
//             <p className="plan-specs">10,000 requests/day</p>
//             <p className="plan-specs">Production License</p>
//             <p className="ssl-text">SSL Included</p>
//             <FreeSignUp />
//           </div>
//           <div className="plan-div">
//             <p className="free-text">Enterprise</p>
//             <p className="plan-specs">100,000 requests/day</p>
//             <p className="plan-specs">Production License</p>
//             <p className="ssl-text">SSL Included</p>
//             <FreeSignUp />
//           </div>
//         </div>
//       </div>
//     );
//   }
// };
// export default PricingPlans;
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PricingPlans = () => {
  const [Logged, setIsLogged] = useState();

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Ae4QL8MSUamULntRT53PwEqZDs61m4t7n8pcBwbbDAJi6T0eRSjurFrngqyVr-pMSOPB1enID5jltbtc&vault=true&intent=subscription";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.paypal
        .Buttons({
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              plan_id: "P-7CD25924B04716625MQJU2FA", // Replace with your plan ID
            });
          },
          onApprove: async function (data, actions) {
            const token = localStorage.getItem("AccessToken");
            const response = await axios.patch(
              "http://localhost:5000/api/users/createSubscription",
              { subscriptionID: data.subscriptionID },
              {
                headers: {
                  authorization: token,
                },
              }
            );
            toast.success(response.data);
          },
        })
        .render("#paypal-button-container-P-7CD25924B04716625MQJU2FA");

      window.paypal
        .Buttons({
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              plan_id: "P-16U6598210255521XMQKXDQI", // Replace with your plan ID
            });
          },
          onApprove: async function (data, actions) {
            const token = localStorage.getItem("AccessToken");
            const response = await axios.patch(
              "http://localhost:5000/api/users/createSubscription",
              { subscriptionID: data.subscriptionID },
              {
                headers: {
                  authorization: token,
                },
              }
            );
            toast.success(response.data);
          },
        })
        .render("#paypal-button-container-P-16U6598210255521XMQKXDQI");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  if (Logged) {
    return (
      <div>
        <div className="pricing-div">
          <Header />
        </div>
        <div className="column">
          <p className="free-text">Professional</p>
          <p className="plan-specs">10,000 requests</p>
          <p className="plan-specs">Production License</p>
          <p className="ssl-text">SSL Included</p>
          <div id="paypal-button-container-P-7CD25924B04716625MQJU2FA"></div>
        </div>

        <div className="column">
          <p className="free-text">Enterprise</p>
          <p className="plan-specs">Unlimited number of requests</p>
          <p className="plan-specs">Production License</p>
          <p className="ssl-text">SSL Included</p>
          <div id="paypal-button-container-P-16U6598210255521XMQKXDQI"></div>
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
