const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: "sandbox",
  client_id:
    "Ae4QL8MSUamULntRT53PwEqZDs61m4t7n8pcBwbbDAJi6T0eRSjurFrngqyVr-pMSOPB1enID5jltbtc",
  client_secret:
    "EI9FgVWvk8pltbj8GhCLBWv4_aW5Q6-PduzwG1jorUwvxqVnY4MjHllACVf__ekcZ-B63DnkSLegnfWf",
});

const plans = [
  {
    name: "Free Plan",
    description:
      "Basic access to the service, limited number of projects and users",
    type: "INFINITE",
    payment_definitions: [
      {
        name: "Monthly Subscription",
        type: "REGULAR",
        frequency_interval: "1",
        frequency: "MONTH",
        cycles: "0",
        amount: {
          currency: "USD",
          value: "0",
        },
      },
    ],
    merchant_preferences: {
      return_url: "https://localhost:3000",
      cancel_url: "https://localhost:3000",
      auto_bill_amount: "YES",
      initial_fail_amount_action: "CONTINUE",
    },
  },
  {
    name: "Pro Plan",
    description:
      "Unlimited projects and users, advanced features such as project analytics and custom branding",
    type: "INFINITE",
    payment_definitions: [
      {
        name: "Monthly Subscription",
        type: "REGULAR",
        frequency_interval: "1",
        frequency: "MONTH",
        cycles: "0",
        amount: {
          currency: "USD",
          value: "10",
        },
      },
    ],
    merchant_preferences: {
      return_url: "https://localhost:3000",
      cancel_url: "https://localhost:3000",
      initial_fail_amount_action: "CONTINUE",
    },
  },
  {
    name: "Professional Plan",
    description:
      "All Pro Plan features, priority support, dedicated account manager",
    type: "INFINITE",
    payment_definitions: [
      {
        name: "Monthly Subscription",
        type: "REGULAR",
        frequency_interval: "1",
        frequency: "MONTH",
        cycles: "0",
        amount: {
          currency: "USD",
          value: "25",
        },
      },
    ],
    merchant_preferences: {
      return_url: "https://localhost:3000",
      cancel_url: "https://localhost:3000",
      auto_bill_amount: "YES",
      initial_fail_amount_action: "CONTINUE",
    },
  },
];

// Create plans
plans.forEach((plan) => {
  paypal.billingPlan.create(plan, (error, billingPlan) => {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(billingPlan);
    }
  });
});
