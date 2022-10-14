//Imports
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//schema utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//Contrôle d'unicité
userSchema.plugin(uniqueValidator);

//Export
module.exports = mongoose.model("User", userSchema);
