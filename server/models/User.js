// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    hasVoted: {
      type: Boolean,
      default: false,
    },
    votedFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
