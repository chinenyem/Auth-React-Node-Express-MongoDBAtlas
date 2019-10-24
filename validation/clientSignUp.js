const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateClientSignUpInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : "";

// firstname checks
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "Firstname field is required";
  }
// Password checks
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Lastname field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Description checks
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }
// Phonenumber checks
  if (Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = "phonenumber field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
