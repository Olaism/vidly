const _ = require("lodash");
const { User, userValidator } = require("../models/user");
const { getValidationErrors, hashPassword } = require("../utils");

async function register(req, res) {
  // validate input
  const { error, value } = userValidator.validate(req.body);
  if (error) return res.status(400).send(error.message);

  // check if username or email exists
  let user = await User.findOne({ username: value.username });
  if (user) return res.status(400).send("Username already taken");

  user = await User.findOne({ email: value.email });
  if (user) return res.status(400).send("Email already taken");

  user = new User(_.pick(value, ["username", "email", "password"]));

  // hash the new password
  user.password = await hashPassword(user.password);

  try {
    await user.save();
    token = user.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
}

async function getUsers(req, res) {
  const users = await User.find().select("username email is_admin");
  res.send(users);
}

exports.register = register;
exports.getUsers = getUsers;
