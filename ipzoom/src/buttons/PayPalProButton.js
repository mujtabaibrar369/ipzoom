import React, { useEffect } from "react";

const PayPalProButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=Ae4QL8MSUamULntRT53PwEqZDs61m4t7n8pcBwbbDAJi6T0eRSjurFrngqyVr-pMSOPB1enID5jltbtc&vault=true&intent=subscription`;
    script.async = true;
    script.setAttribute("data-sdk-integration-source", "button-factory");
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      window.paypal
        .Buttons({
          style: {
            shape: "pill",
            color: "blue",
            layout: "vertical",
            label: "pro",
            innerWidth: "100px",
          },
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              /* Creates the subscription */
              plan_id: "P-7CD25924B04716625MQJU2FA",
            });
          },
          onApprove: function (data, actions) {
            alert(data.subscriptionID); // You can add optional success message for the subscriber here
          },
        })
        .render("#paypal-button-container-P-7CD25924B04716625MQJU2FA"); // Renders the PayPal button
    });
  }, []);

  return (
    <div>
      <div id="paypal-button-container-P-7CD25924B04716625MQJU2FA"></div>
    </div>
  );
};

export default PayPalProButton;
