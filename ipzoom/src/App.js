import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import ErrorPage from "./components/ErrorPage";
import SignUpForm from "./components/SignUpForm";
import ResetForm from "./components/ResetForm";
import PricingPlans from "./components/PricingPlans";
import SetNewPassword from "./components/SetNewPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/reset" element={<ResetForm />}></Route>
        <Route path="/pricing" element={<PricingPlans />}></Route>
        <Route path="/setnewpassword" element={<SetNewPassword />}></Route>
        <Route path="*" element={ErrorPage} />
      </Routes>
    </Router>
  );
}

export default App;
