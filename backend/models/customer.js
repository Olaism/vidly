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
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "User phone number required"],
    },
  })
);

const customerValidator = Joi.object({
  isGold: Joi.boolean(),
  name: Joi.string().min(3),
  phone: Joi.string().min(10),
});

exports.Customer = Customer;
exports.customerValidator = customerValidator;
