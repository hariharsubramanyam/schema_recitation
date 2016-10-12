var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  // TODO: Add a field called profile, which is an object that contains a
  // string called pathToProfilePic and a string called bio.
});

UserSchema.path("email").validate(function(value) {
  // This uses a Regular Expression to check if this is a valid email.
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
}, "Invalid Email Address");

// TODO: Create a validator that ensures the name is less than 10 characters 
// long.

var UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
