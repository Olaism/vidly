const { genreValidator, Genre } = require("../models/genres");
const { getValidationErrors } = require("../utils");

const getGenres = async (req, res) => {
  const courses = await Genre.find();
  res.send(courses);
};

const postGenres = async (req, res) => {
  const { value, error } = genreValidator.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
  const genre = new Genre(value);
  try {
    const result = await genre.save();
    res.send(result);
  } catch (err) {
    const errors = getValidationErrors(err);
    return res.status(400).send(errors);
  }
};

const getGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
  } catch (error) {
    return res.status(400).send("Not found");
  }
};

const putGenre = async (req, res) => {
  const { value, error } = genreValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  try {
    const genre = await Genre.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: value,
      }
    );
    res.send(genre);
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
};

const patchGenre = async (req, res) => {
  const { value, error } = genreValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  console.log(value);
  try {
    const genre = await Genre.findById(req.params.id);
    genre.name = value.name;
    try {
      const result = await genre.save();
      res.send(result);
    } catch (error) {
      const errors = getValidationErrors(error);
      return res.status(400).send(errors);
    }
  } catch (err) {
    res.status(404).send("Not found.");
  }
};

const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove({ _id: req.params.id });
    res.send(genre);
  } catch (err) {
    res.status(404).send("Not found.");
  }
};

exports.getGenres = getGenres;
exports.postGenres = postGenres;
exports.getGenre = getGenre;
exports.putGenre = putGenre;
exports.patchGenre = patchGenre;
exports.deleteGenre = deleteGenre;
