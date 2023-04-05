import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import ErrorPage from "./components/ErrorPage";
import SignUpForm from "./components/SignUpForm";
import ResetForm from "./components/ResetForm";
import PricingPlans from "./components/PricingPlans";
import SetNewPassword from "./components/SetNewPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import Subscribe from "./components/Subscribe";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/reset" element={<ResetForm />}></Route>
          <Route path="/pricing" element={<PricingPlans />}></Route>
          <Route
            path="/resetPassword/:resetToken"
            element={<SetNewPassword />}
          ></Route>
          <Route path="*" element={ErrorPage} />
          <Route path="/logout" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/subscribe" element={<Subscribe />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
