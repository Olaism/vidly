const { User } = require("../models/user");
const { getValidationErrors } = require("../utils");

async function getUsers(req, res) {
  const users = await User.find();
  res.send(users);
}

async function register(req, res) {
  // validate input
  const { error, value } = req.body;
  if (error) return res.status(400).send(error.message);

  const user = user({
    username: value.username,
    email: value.email,
    password: value.password,
  });

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
}

exports.getUsers = getUsers;
