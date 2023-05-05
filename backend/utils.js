function getValidationErrors(err) {
  const new_obj = {};
  for (field in err.errors) {
    new_obj[field] = err.errors[field].message;
  }
  return new_obj;
}

exports.getValidationErrors = getValidationErrors;
