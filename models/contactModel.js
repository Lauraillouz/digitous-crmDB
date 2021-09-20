const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
