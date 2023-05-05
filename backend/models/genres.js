const { connect, model, Schema } = require("mongoose");
const Joi = require("joi");

const connectMongoose = async () => {
  await connect("mongodb://127.0.0.1:27017/vidly");
};

connectMongoose().catch((err) => console.log(err));

const Genre = model(
  "Genre",
  Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      unique: true,
    },
  })
);

const genreValidator = Joi.object({
  name: Joi.string().min(3).required(),
});

exports.genreValidator = genreValidator;
exports.Genre = Genre;
