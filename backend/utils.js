const mongoose = require("mongoose");

function getValidationErrors(err) {
  const new_obj = {};
  for (field in err.errors) {
    new_obj[field] = err.errors[field].message;
  }
  return new_obj;
}

function calcRentalFee(date1, date2, rate) {
  // Calculate the difference in milliseconds
  const diffInMs = date2.getTime() - date1.getTime();

  // Convert the difference to days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return (diffInDays * rate).toFixed(2);
}

function validateId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.getValidationErrors = getValidationErrors;
exports.calcRentalFee = calcRentalFee;
exports.validateId = validateId;
