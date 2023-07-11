const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController")

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(deleteContact).delete(updateContact);

module.exports = router;