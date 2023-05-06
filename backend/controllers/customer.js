const { Customer, customerValidator } = require("../models/customer");
const { getValidationErrors } = require("../utils");

const getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
};

const postCustomers = async (req, res) => {
  // validate input or send error
  const { value, error } = customerValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  // save customer or send error
  const customer = Customer(value);
  try {
    const result = await customer.save();
    res.send(result);
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
};

const getCustomer = async (req, res) => {
  // get customer or send 404
  try {
    const customer = await Customer.findById(req.params.id);
    customer && res.send(customer);
    return res.status(404).send("Not found.");
  } catch (err) {
    return res.status(404).send("Not found.");
  }
};

const putCustomer = async (req, res) => {
  // find the course if it exists else return 404
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send("Not found.");
    }
  } catch (error) {
    return res.status(404).send("Not found");
  }
  // validate the input
  const { value, error } = customerValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  // update the customer or send error
  try {
    const customer = await Customer.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: value,
      }
    );
    res.send(customer);
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
};

const deleteCustomer = async (req, res) => {
  // get the course
  try {
    const customer = await Customer.findByIdAndRemove({ _id: req.params.id });
    // send 404 if course does not exists!
    if (!customer) {
      return res.status(404).send("Not found");
    }
    res.send(customer);
  } catch (err) {
    res.status(404).send("Not found.");
  }
};

exports.getCustomers = getCustomers;
exports.postCustomers = postCustomers;
exports.getCustomer = getCustomer;
exports.putCustomer = putCustomer;
exports.deleteCustomer = deleteCustomer;
