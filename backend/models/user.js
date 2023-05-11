const { Schema, models } = require("mongoose");
const Joi = require("joi");

const User = models(
  "User",
  Schema({
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
    repeat_password: {
      type: "string",
      required: true,
      min: 8,
      max: 1024,
    },
    is_admin: Boolean,
  })
);

const userValidator = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(5).max(120).email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
}).with("password repeat_password");

exports.User = User;
