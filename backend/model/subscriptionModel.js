const mongoose = require("mongoose");
const subscriptionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "user,",
  },
  subscriptionStatus: {
    type: String,
    required: true,
    default: "Not Available",
  },
  subscriptionId: {
    type: String,
    required: true,
    default: "null",
  },
  planId: {
    type: String,
    required: true,
    default: "null",
  },
  planName: {
    type: String,
    required: true,
    default: "Free",
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
    default: "null",
  },
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
