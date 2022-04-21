const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Friend Request", "Message", "Comment", "Like"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }},
  {
    timestamps: true
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;