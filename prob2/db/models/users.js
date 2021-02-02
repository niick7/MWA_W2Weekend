const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    required: true
  }
})

mongoose.model("User", userSchema, "users")