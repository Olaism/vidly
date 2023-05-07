const { model, Schema } = require("mongoose");
const Joi = require("joi");

const genreSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    unique: true,
  },
});

const Genre = model("Genre", genreSchema);

const genreValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

exports.genreValidator = genreValidator;
exports.genreSchema = genreSchema;
exports.Genre = Genre;
