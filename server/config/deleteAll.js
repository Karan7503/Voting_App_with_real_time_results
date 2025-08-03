// deleteAll.js
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db");

// Import all models you want to clear
const Candidate = require("../models/Candidate");
const User = require("../models/User");

const deleteAllData = async () => {
  await connectDB();

  try {
    await Candidate.deleteMany({});
    await User.deleteMany({});
    console.log("🧹 All Candidates and Users deleted");
    process.exit();
  } catch (err) {
    console.error("❌ Error deleting data:", err.message);
    process.exit(1);
  }
};

deleteAllData();
