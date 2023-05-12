const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  isLogedIn,
  changePassword,
  resetPassword,
  checkVpn,
  checkUserIp,
  searchUserIp,
  forgotPassword,
  getSubscription,
  createSubscription,
} = require("../controller/userController");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", userProfile);
router.get("/isLogedIn", isLogedIn);
router.patch("/changePassword", changePassword);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);
router.get("/checkUserIp", checkUserIp);
router.get("/searchUserIp/:ip", searchUserIp);
router.get("/checkVpn/:ip", checkVpn);
router.post("/createSubscription", createSubscription);
router.get("/getSubscription", getSubscription);
module.exports = router;
