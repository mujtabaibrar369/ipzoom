const mongoose = require("mongoose");
const subscriptionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "user,",
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  subscriptionStatus: {
    type: String,
    required: true,
    default: "Free",
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
  },
  counter: {
    type: Number,
    default: 0,
  },
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
