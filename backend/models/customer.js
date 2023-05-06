const { Schema, model } = require("mongoose");
const Joi = require("joi");

const Customer = model(
  "Customer",
  Schema({
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    phone: String,
  })
);

const customerValidator = Joi.object({
  isGold: Joi.boolean(),
  name: Joi.string().min(3),
  phone: Joi.string().min(10),
});

exports.Customer = Customer;
exports.customerValidator = customerValidator;
