const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
