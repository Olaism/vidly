const { rentalValidator, rentalPatchValidator } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");
const { getValidationErrors, validateId, calcRentalFee } = require("../utils");

async function getRentals(req, res) {
  const rentals = await Rental.find();
  res.send(rentals);
}

async function postRentals(req, res) {
  // validate input
  const { value, error } = rentalValidator.validate(req.body);
  if (error) return res.status(400).send(error.message);

  // validate customer
  const customer = await Customer.findById(value.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  //validate movie
  const movie = await Movie.findById(value.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  // validate if numberInStock is enough
  if (movie.numberInStock === 0) return res.send("Movie is unavailable");

  // save rental
  const rental = await Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    await rental.save(); // save rental

    movie.numberInStock--; // decrease the number in Stock option
    await movie.save(); // save the movie instance

    res.send(rental); // send the rental instance to client
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
}

async function getRental(req, res) {
  const id = req.params.id;
  if (!validateId(id)) return res.status(404).send("Not Found.");
  const rental = await Rental.findById(id).select(
    "movie customer dateOut dateReturned rentalFee"
  );
  res.send(rental);
}

async function putRental(req, res) {
  // validate input
  const { value, error } = rentalValidator.validate(req.body);
  if (error) return res.status(400).send(error.message);

  // validate id
  const id = req.params.id;
  if (!validateId(id)) return res.status(404).send("Not Found.");

  // validate customer
  const customer = await Customer.findById(value.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  //validate movie
  const movie = await Movie.findById(value.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  // get rental instance
  try {
    const rental = await Rental.findByIdAndUpdate(id, {
      $set: {
        customer: customer,
        movie: movie,
      },
    });
    res.send(rental);
  } catch (error) {
    console.log(error);
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
}

async function patchRental(req, res) {
  // validate input
  const { value, error } = rentalPatchValidator.validate(req.body);
  if (error) return res.status(400).send(error.message);
  console.log(value);

  // validate id
  const id = req.params.id;
  if (!validateId(id)) return res.status(404).send("Not Found.");

  // get rental instance
  const rental = await Rental.findById(id);
  if (value.customerId) {
    // validate customer
    const customer = await Customer.findById(value.customerId);
    console.log(customer);
    if (!customer) return res.status(400).send("Invalid customer");
    // update rental instance
    rental.customer._id = customer._id;
    rental.customer.name = customer.name;
    rental.customer.isGold = customer.isGold;
    rental.customer.phone = customer.phone;
  }
  if (value.movieId) {
    //validate movie
    const movie = await Movie.findById(value.movieId);
    if (!movie) return res.status(400).send("Invalid movie");
    // update rental instance
    rental.movie._id = movie._id;
    rental.movie.title = movie.title;
    rental.movie.dailyRentalRate = movie.dailyRentalRate;
  }
  if (value.dateReturned) {
    // update rental instance
    rental.dateReturned = value.dateReturned;
    // calculate the rental fee
    const fee = calcRentalFee(
      rental.dateOut,
      rental.dateReturned,
      rental.movie.dailyRentalRate
    );
    rental.rentalFee = fee;
  }

  try {
    await rental.save();
    res.send(rental);
  } catch (error) {
    const errors = getValidationErrors(error);
    return res.status(400).send(errors);
  }
}

async function deleteRental(req, res) {
  // validate id
  const id = req.params.id;
  if (!validateId(id)) return res.status(404).send("Not Found.");

  const rental = await Rental.findByIdAndRemove(id);

  res.send(rental);
}

exports.getRentals = getRentals;
exports.postRentals = postRentals;
exports.getRental = getRental;
exports.putRental = putRental;
exports.patchRental = patchRental;
exports.deleteRental = deleteRental;
