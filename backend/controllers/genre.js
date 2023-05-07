const { genreValidator, Genre } = require("../models/genre");
const { getValidationErrors } = require("../utils");

const getGenres = async (req, res) => {
  const courses = await Genre.find().select("_id name");
  res.send(courses);
};

const postGenres = async (req, res) => {
  // validate input or send error
  const { value, error } = genreValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  // save genre or send error
  const genre = Genre(value);
  try {
    const result = await genre.save();
    res.send(result);
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
};

const getGenre = async (req, res) => {
  // get genre or send 404
  try {
    const genre = await Genre.findById(req.params.id, "name");
    if (!genre) {
      return res.status(404).send("Not Found");
    } else {
      res.send(genre);
    }
  } catch (error) {
    return res.status(404).send("Not found.");
  }
};

const putGenre = async (req, res) => {
  const id = req.params.id;
  // check if id is valid or return 404
  try {
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send("Not Found.");
  } catch (error) {
    return res.status(400).send("Not Found.");
  }
  // Validate input
  const { value, error } = genreValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  // update the genre or send error
  try {
    const genre = await Genre.findByIdAndUpdate(id, {
      $set: value,
    });
    res.send(genre);
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
};

const deleteGenre = async (req, res) => {
  const id = req.params.id;
  // check if id is valid or return 404
  try {
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send("Not Found");
  } catch (error) {
    return res.status(404).send("Not Found");
  }
  // Delete genre
  try {
    const genre = await Genre.findByIdAndRemove(id);
    res.send(genre);
  } catch (err) {
    res.status(404).send("Not found.");
  }
};

exports.getGenres = getGenres;
exports.postGenres = postGenres;
exports.getGenre = getGenre;
exports.putGenre = putGenre;
exports.deleteGenre = deleteGenre;
