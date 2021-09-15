const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: String,
  email: {
    type: String,
    unique: true,
  },
  description: String,
  category: Number,
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
