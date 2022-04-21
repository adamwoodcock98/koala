const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Friend Request", "Message", "Comment", "Like"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Notifications = mongoose.model("Notifications", notificationsSchema);

module.exports = Notifications;