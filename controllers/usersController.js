const { User } = require("../models/schemas/userSchema");
// const { Conflict,Unauthorized} = require("http-errors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { JWT_SECRET } = process.env



async function getContacts(req, res, next) {
    const { user } = req;

  return res.status(200).json({
    data: {
      contacts:user.contacts,
    }
  })
}
async function createContact(req, res, next) {
    const { _id } = req.body;
    const { user } = req;

    user.contacts.push(_id);
   await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: {
      contacts:user.contacts,
    }
  })
}

module.exports = {
  getContacts,
  createContact,
};