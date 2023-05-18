const { User, validateUserAuth } = require("../models/user");
const { isValidPassword } = require("../utils");

async function authenticate(req, res) {
  // validate input
  const { value, error } = validateUserAuth.validate(req.body);
  if (error) return res.status(400).send(error.message);

  // check if user exists
  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(400).send("Invalid username or password.");

  // authenticate user
  const validPassword = await isValidPassword(value.password, user.password);

  // send result
  if (!validPassword)
    return res.status(400).send("Invalid Username or Password.");

  token = user.generateAuthToken();

  res.send(token);
}

exports.authenticate = authenticate;
