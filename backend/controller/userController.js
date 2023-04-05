const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const API_KEY = "a2a27d746a9f48dca3086f00fdfd6435";
const isIPProxy = require("is-ip-proxy");
const sendEmail = require("../utils/mailSender");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (password.length < 6) {
    return res.json("Password must be greater than 6 characters");
  }
  const eUser = await User.findOne({ email });
  if (eUser) {
    return res.json("Email already registered");
  }

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    if (user) {
      const token = generateToken(user._id);
      res.json({ AccessToken: token });
    } else {
      res.status(400).json("bad request..");
    }
  } catch (error) {
    res.json(error.message);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json("Please add email and password");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json("User not found");
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (passwordIsCorrect) {
      const token = generateToken(user._id);
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //1 day
        sameSite: "none",
        //secure: true,
      });
    }
    if (user && passwordIsCorrect) {
      const token = generateToken(user._id);
      res.json({ AccessToken: token });
    } else {
      res.send("User not found");
    }
  } catch (error) {
    res.json({ err: error.message });
  }
};
const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), //NOW
    sameSite: "none",
  });
  res.status(200).json({ msg: "User Logged Out" });
};
const userProfile = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      const id = verified.id;
      const user = await User.findById(id).select("-password");
      console.log(user);
      res.json(user);
    } else {
      res.json("User not authorized");
    }
  } catch (error) {
    res.status(403).send("Forbidden");
  }
};
const isLogedIn = async (req, res) => {};
const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const oldPassword = req.body.password;
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (isPasswordCorrect) {
        const newPassword = req.body.newPassword;
        const confirmNewPassword = req.body.confirmNewPassword;
        if (newPassword === confirmNewPassword) {
          user.password = newPassword;
          const updatedUser = await user.save();
          res.cookie("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0), //NOW
            sameSite: "none",
          });
          res.json(
            "password updated successfully please sign in with new password"
          );
        } else {
          res.json("Password did not matched");
        }
      } else {
        res.json("You have enterd an incorrect password");
      }
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    //Delete token if it exists against that user id
    if (user) {
      let token = await Token.findOne({ userId: user._id });
      if (token) {
        await token.deleteOne();
      }
      const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
      console.log(resetToken);
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      await Token.create({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000), // 30 mins
      });
      const resetUrl = `${process.env.Frontend_URL}/resetPassword/${resetToken}`;
      const message = `
      <h2>Hello ${user.firstName}</h2>
      <p>You requested for a password reset</p>
      <p>Please use the url below to reset passsword</p>
      <p>This link is valid for only 30 minutes</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <p>Regards</p>
      <p>Pinvent team</p>`;
      const subject = "Password reset request";
      const sent_to = user.email;
      const sent_from = process.env.Email_User;
      await sendEmail(subject, message, sent_to, sent_from);
      res.json({ success: true, message: "Reset Email sent" });
    } else {
      res.json("user not found");
    }
  } catch (error) {
    res.json({ err: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  console.log(resetToken);
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });
  if (!userToken) {
    res.status(404).send("Invalid or expired token");
  }
  const user = await User.findOne({ _id: userToken.userId });
  if (user) {
    user.password = password;
    await user.save();
    res.status(200).json("Password reset successfully");
  }
};
// http://172.16.221.91:6117/geo_IP?ip=175.216.39.11
const searchUserIp = async (req, res) => {
  try {
    const ipAddress = req.params.ip;
    console.log(ipAddress);
    // const IpInfo = await axios.get(
    //   `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipAddress.data.ip}`
    // );

    const ipinfo = await axios.get(
      `http://172.16.221.91:6117/geo_IP?ip=${ipAddress}`
    );
    if (ipinfo) {
      res.json(ipinfo.data);
    } else {
      res.json("Not responding");
    }
  } catch (error) {
    res.json(error.message);
  }
};
const checkVpn = async (req, res) => {
  const ip = req.body.ip;
  if (ip) {
    const result = await isIPProxy.check(ip);
    if (result === false) {
      res.json({ Vpn_detected: "false" });
    } else {
      res.json({ Vpn_detected: "true" });
    }
  }
};
const checkUserIp = async (req, res) => {
  try {
    const ipAddress = await axios.get(`https://api.ipgeolocation.io/getip`);
    //const IpInfo = await axios.get(
    //`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipAddress.data.ip}`
    //  );
    const ipinfo = await axios.get(
      `http://172.16.221.91:6117/geo_IP?ip=${ipAddress}`
    );
    if (ipinfo) {
      res.json(ipinfo.data);
    } else {
      res.json("Not responding");
    }
  } catch (error) {
    res.json(error.message);
  }
};
const subscription = async (req, res) => {
  res.send(` <div id="paypal-button-container-P-7CD25924B04716625MQJU2FA"></div>
    <script
      src="https://www.paypal.com/sdk/js?client-id=Ae4QL8MSUamULntRT53PwEqZDs61m4t7n8pcBwbbDAJi6T0eRSjurFrngqyVr-pMSOPB1enID5jltbtc&vault=true&intent=subscription"
      data-sdk-integration-source="button-factory"
    ></script>
    <script>
      paypal
        .Buttons({
          style: {
            shape: "pill",
            color: "blue",
            layout: "vertical",
            label: "subscribe",
          },
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              /* Creates the subscription */
              plan_id: "P-7CD25924B04716625MQJU2FA",
            });
          },
          onApprove: function (data, actions) {
            alert(data.subscriptionID); // You can add optional success message for the subscriber here
            console.log(subscription);
          },
        })
        .render("#paypal-button-container-P-7CD25924B04716625MQJU2FA"); // Renders the PayPal button
    </script>`);
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  isLogedIn,
  changePassword,
  resetPassword,
  checkUserIp,
  checkVpn,
  subscription,
  searchUserIp,
  forgotPassword,
};
