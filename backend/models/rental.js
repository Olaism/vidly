const { Schema, model } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Rental = model(
  "Rental",
  new Schema({
    customer: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          minLength: 2,
          maxLength: 255,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
          },
        },
      }),
      required: true,
    },
    movie: {
      type: new Schema({
        title: {
          type: String,
          trim: true,
          minLength: 3,
          maxLength: 255,
          required: true,
        },
        dailyRentalRate: {
          type: Number,
          required: 0,
          min: 0,
          max: 255,
        },
      }),
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: Date,
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

const rentalValidator = Joi.object({
  customerId: Joi.objectId().required(),
  movieId: Joi.objectId().required(),
});

const rentalPatchValidator = Joi.object({
  customerId: Joi.objectId(),
  movieId: Joi.objectId(),
  dateReturned: Joi.date().max("now"),
});

exports.Rental = Rental;
exports.rentalValidator = rentalValidator;
exports.rentalPatchValidator = rentalPatchValidator;
