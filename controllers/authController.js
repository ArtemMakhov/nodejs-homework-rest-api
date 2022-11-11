const { User } = require("../models/schemas/userSchema");
const { Conflict,Unauthorized} = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env



async function register(req, res, next) {
  const { email, password } = req.body;
  
  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(password, salt);
 
  const user = new User({ email, password });
  
  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      throw new Conflict("Email in use")
    }
    throw error;
  }

  return res.status(201).json({
    data: {
      user,
    }
  })
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email or password is wrong")
  }
  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    throw new Unauthorized("wrong password");
  }
  const token = jwt.sign({_id: user._id},JWT_SECRET,{expiresIn: "15m"});
  return res.json({
    data: {
      token,
    },
  });
}

module.exports = {
  register,
  login,
};