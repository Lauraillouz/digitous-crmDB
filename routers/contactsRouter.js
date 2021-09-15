const express = require("express");
const router = express.Router();

// Controller
const contactsController = require("../controllers/contactsController");

// Routes
router.get("/", contactsController.getContacts);
router.post("/", contactsController.newContact);
router.put("/", contactsController.modifyContact);
router.delete("/", contactsController.deleteContacts);

module.exports = router;
