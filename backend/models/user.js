const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

const userSchema = Schema({
  username: {
    type: "string",
    unique: true,
    min: 3,
    max: 255,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
    min: 5,
    max: 120,
  },
  password: {
    type: "string",
    required: true,
    min: 8,
    max: 1024,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
  return token;
};

const User = model("User", userSchema);

const userValidator = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(5).max(120).email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeat_password: Joi.ref("password"),
});

const validateUserAuth = Joi.object({
  email: Joi.string().min(5).max(120).email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

exports.User = User;
exports.userValidator = userValidator;
exports.validateUserAuth = validateUserAuth;
