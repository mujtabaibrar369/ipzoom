const User = require("../model/userModel");
var fetch = require("node-fetch");
const Token = require("../model/tokenModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const API_KEY = "a2a27d746a9f48dca3086f00fdfd6435";
const isIPProxy = require("is-ip-proxy");
const sendEmail = require("../utils/mailSender");
const Subscription = require("../model/subscriptionModel");
const { URL, URLSearchParams } = require("url");
const querystring = require("querystring");
const { log } = require("console");

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
const isLogedIn = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    res.status(403).send("Forbidden");
  }
};
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
const searchUserIp = async (req, res) => {
  try {
    const ipAddress = req.params.ip;
    console.log(ipAddress);
    const ipInfo = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipAddress}`
    );

    if (ipInfo) {
      res.json(ipInfo.data);
    } else {
      res.json("Not responding");
    }
  } catch (error) {
    res.json(error.message);
  }
};
const checkVpn = async (req, res) => {
  const ip = req.params.ip;
  console.log(ip);
  if (ip) {
    const result = await isIPProxy.check(ip);
    if (result === true) {
      res.json({ Vpn_detected: "true" });
    } else {
      res.json({ Vpn_detected: "false" });
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
      console.log(ipinfo.data);
    } else {
      res.json("Not responding");
    }
  } catch (error) {
    res.json(error.message);
  }
};
const createSubscription = async (req, res) => {
  try {
    const apiKey = crypto.randomBytes(32).toString("hex");
    const subscriptionID = req.body.subscriptionID;
    const token = req.headers["authorization"];
    const auth =
      "QWU0UUw4TVNVYW1VTG50UlQ1M1B3RXFaRHM2MW00dDduOHBjQndiYkRBSmk2VDBlUlNqdXJGcm5ncXlWci1wTVNPUEIxZW5JRDVqbHRidGM6RUk5RmdWV3ZrOHBsdGJqOEdoQ0xCV3Y0X2FXNVE2LVBkdXp3RzFqb3JVd3Z4cVZuWTRNakhsbEFDVmZfX2VrY1otQjYzRG5rU0xlZ25mV2Y="; // paypal client id and secret code encoded to base 64
    const { data } = await axios.get(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}`,
      {
        headers: {
          "X-PAYPAL-SECURITY-CONTEXT":
            '{"consumer":{"accountNumber":1181198218909172527,"merchantId":"5KW8F2FXKX5HA"},"merchant":{"accountNumber":1659371090107732880,"merchantId":"2J6QB8YJQSJRJ"},"apiCaller":{"clientId":"Ae4QL8MSUamULntRT53PwEqZDs61m4t7n8pcBwbbDAJi6T0eRSjurFrngqyVr-pMSOPB1enID5jltbtc","appId":"APP-6DV794347V142302B","payerId":"2J6QB8YJQSJRJ","accountNumber":"1659371090107732880"},"scopes":["https://api-m.paypal.com/v1/subscription/.*","https://uri.paypal.com/services/subscription","openid"]}',
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${auth}`,
        },
      }
    );
    if (data) {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (verified) {
        console.log(verified);
        const uID = verified.id;
        const user = await User.findById(uID);
        let planName = "Free";
        if (data.plan_id == "P-7CD25924B04716625MQJU2FA") {
          planName = "Professional";
        } else if (data.plan_id == "P-16U6598210255521XMQKXDQI") {
          planName = "Enterprise";
        }
        if (user) {
          try {
            await Subscription.create({
              userId: user._id,
              subscriptionStatus: data.status,
              subscriptionId: data.id,
              planId: data.plan_id,
              apiKey: apiKey,
              planName: planName,
            });
          } catch (errror) {
            console.log(errror);
          }
        }
      }
      res.send("Subscription Created.");
    }
  } catch (error) {
    res.send(error.message);
  }
};
const getSubscription = async (req, res) => {
  const token = req.headers["authorization"];
  if (token) {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      const uID = verified.id;
      const data = await Subscription.findOne({ userId: uID });
      res.json(data);
    }
  } else {
    res.send("Not Available");
  }
};
const restApi = async (req, res) => {
  const extractedURL = req.url;
  const parsedUrl = new URL(extractedURL, "http://localhost"); // Provide a dummy hostname
  const parsedQuery = new URLSearchParams(parsedUrl.search);
  const apiKey = parsedQuery.get("api_key");
  const IP = parsedQuery.get("ip");
  const subscription = await Subscription.findOne({ apiKey: apiKey });
  if (subscription) {
    const IpInfo = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${IP}`
    );
    res.json(IpInfo.data);
  } else {
    res.json("Invalid Api KEY");
  }
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
  searchUserIp,
  forgotPassword,
  createSubscription,
  getSubscription,
  restApi,
};
