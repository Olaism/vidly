const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = model(
  "Movie",
  Schema({
    title: {
      type: String,
      minLength: 3,
      maxLength: 100,
      required: true,
      trim: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 200,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 150,
    },
  })
);

const movieValidator = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  genreId: Joi.string().required(),
  numberInStock: Joi.number().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required(),
});

exports.movieValidator = movieValidator;
exports.Movie = Movie;
