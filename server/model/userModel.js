const mongoose = require("mongoose");

// create a schema
const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    transactions: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  },
  { timestamps: true }
);

// create a model
const User = mongoose.model("user", userSchema);

module.exports = User;