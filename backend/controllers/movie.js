const { Movie, movieValidator } = require("../models/movie");
const { Genre } = require("../models/genre");
const { getValidationErrors } = require("../utils");

const getMovies = async (req, res) => {
  const movies = await Movie.find().select(
    "title genre numberInStock dailyRentalRate"
  );
  res.send(movies);
};

const postMovies = async (req, res) => {
  // validate input or return error
  const { value, error } = movieValidator.validate(req.body);
  if (error) return res.status(400).send(error.message);
  // get genre
  try {
    const genre = await Genre.findById(value.genreId).select("name");
    if (!genre) return res.status(400).send("Bad request. Invalid genre");
    //save movie or send error
    const movie = Movie({
      title: value.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: value.numberInStock,
      dailyRentalRate: value.dailyRentalRate,
    });
    try {
      const result = await movie.save();
      res.send(result);
    } catch (error) {
      const errors = getValidationErrors(error);
      return res.status(400).send(errors);
    }
  } catch (error) {
    return res.status(400).send("Bad request. Invalid genre.");
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Not found");
    res.send(movie);
  } catch (error) {
    return res.status(404).send("Not found");
  }
};

const putMovie = async (req, res) => {
  // validate movie id
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Not found");
  } catch (error) {
    return res.status(404).send("Not found");
  }
  // validate user input
  const { value, error } = movieValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  // validate genre id
  try {
    const genre = await Genre.findById(value.genreId);
    if (!genre) return res.status(400).send("Bad request. Invalid genre ID");
    // update movie
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: {
          title: value.title,
          genre: {
            _id: genre._id,
            name: genre.name,
          },
          numberInStock: value.numberInStock,
          dailyRentalRate: value.dailyRentalRate,
        },
      });
      res.send(movie);
    } catch (error) {
      const errors = getValidationErrors(error);
      return res.status(400).send(errors);
    }
  } catch (error) {
    return res.status(400).send("Bad request. Invalid genre ID");
  }
};

const deleteMovie = async (req, res) => {
  // check if id is valid
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Not found.");
  } catch (error) {
    res.status(404).send("Not found.");
  }
  // delete the movie
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    res.send(movie);
  } catch (error) {
    return res.status(404).send("Not found.");
  }
};

exports.getMovies = getMovies;
exports.postMovies = postMovies;
exports.getMovie = getMovie;
exports.putMovie = putMovie;
exports.deleteMovie = deleteMovie;
