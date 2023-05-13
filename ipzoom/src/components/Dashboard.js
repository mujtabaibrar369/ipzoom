import "./Dashboard.css";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import AddSubscription from "../buttons/AddSubscription";
import { useEffect, useState } from "react";
import axios from "axios";
import PayPalProButton from "../buttons/PayPalProButton";
const Dashboard = () => {
  const [status, setStatus] = useState();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] =
    useState("Not Subscribed Yet");
  const [subscriptionID, setSubscriptionID] = useState("-");

  const token = localStorage.getItem("AccessToken");
  useEffect(() => {
    if (token) {
      async function fetchUser() {
        try {
          const userResponse = await axios.get(
            "http://localhost:5000/api/users/getUser",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const subscriptionResponse = await axios.get(
            "http://localhost:5000/api/users/getsubscription",
            {
              headers: {
                authorization: token,
              },
            }
          );
          console.log(subscriptionResponse);
          setUserFirstName(userResponse.data.firstName);
          setUserLastName(userResponse.data.lastName);
          setUserEmail(userResponse.data.email);
          setSubscriptionStatus(subscriptionResponse.data.subscriptionStatus);
          setSubscriptionID(subscriptionResponse.data.subscriptionId);
        } catch (error) {
          console.log("Error fetching user", error);
        }
      }
      fetchUser();
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, []);
  if (status) {
    return (
      <div>
        <div className="dashboard-main-div">
          <DashboardHeader />
        </div>
        <div className="dashboard-personal">
          <div className="personal-heading">
            <p className="personal-text">Personal Information</p>
          </div>
          <p className="personal-info">
            First Name: <span className="personal-value">{userFirstName}</span>
          </p>
          <p className="personal-info">
            Last Name: <span className="personal-value">{userLastName}</span>
          </p>
          <p className="personal-info">
            Email Address: <span className="personal-value">{userEmail}</span>
          </p>
          <p className="personal-info">
            Subscription Id:{" "}
            <span className="personal-value">{subscriptionID}</span>
          </p>
          <p className="personal-info">
            Subscription Status:{" "}
            <span className="personal-value">{subscriptionStatus}</span>
          </p>
        </div>
        <div className="dashboard-main">
          <div className="api-keys-heading">
            <p className="api-keys-text">API Keys</p>
          </div>
          <div className="type-key-div">
            <div className="type-div">
              <p className="type-text">Type</p>
              <p className="developer-text">Developer</p>
            </div>
            <div className="key-div">
              <p className="key-text">Key</p>
              <div className="key-back">
                <p className="key-value">
                  563264a1-1768-4b38-83dd-13a5f3f8e966
                </p>
              </div>
            </div>
            <div className="usage-div">
              <p className="usage-text">Total Usage</p>
              <p className="usage-value">0/100</p>
            </div>
            <div className="createdDate-div">
              <p className="createdDate-text">Created Date</p>
              <p className="date-value">17 Mar 2023</p>
            </div>
            <div className="limits-div">
              <p className="limits-text">Limits</p>
              <p className="usage-value">100</p>
            </div>
            <div className="current-subscription-div">
              <p className="current-text">Current Subscription</p>
              <p className="subscription-value">Free</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>User is not authorized please sign in</h2>
      </div>
    );
  }
};
export default Dashboard;
