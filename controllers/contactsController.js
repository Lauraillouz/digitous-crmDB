const Contact = require("../models/contactModel");
const User = require("../models/userModel");

const getContacts = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const userId = user._id;

  const contacts = await Contact.find({ userId });
  const numberOfContacts = contacts.length;

  if (user) {
    res.status(202).json({
      message: "Access granted",
      data: contacts,
      nb: numberOfContacts,
    });
  }
};

const newContact = async (req, res) => {
  const contactInfo = req.body;

  const contact = await Contact.findOne({ email: contactInfo.email });

  if (!contact) {
    try {
      const newContact = await Contact.create(contactInfo);
      return res.status(201).json({
        message: "New contact has successfully been created",
        data: newContact,
      });
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }
};

const modifyContact = () => {};

const deleteContacts = () => {};

module.exports = { getContacts, newContact, modifyContact, deleteContacts };
