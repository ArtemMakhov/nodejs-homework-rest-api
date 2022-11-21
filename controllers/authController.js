const { User } = require("../models/schemas/userSchema");
const { Conflict,Unauthorized} = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();


const { JWT_SECRET } = process.env

async function signup(req, res, next) {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  
  const result = await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarURL: gravatar.url(email, {protocol: "https"}),
  });
  res.status(201).json({
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      }
    }
  });

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
  
  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "15m" });
  user.token = token;
  await User.findByIdAndUpdate(user._id, user);
  return res.status(200).json({
    data: {
      token,
      user: {email: user.email, subscription: user.subscription },
    },
  });
}

async function logout(req, res, next) {
  const { user } = req;
  user.token = null;
  if (!user) {
    throw new Unauthorized("Not authorized");
  }
  await User.findByIdAndUpdate(user._id, user);

  return res.status(204).json("No content");
}

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
}

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
};