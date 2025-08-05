// seed.js
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
// const Candidate = require("./models/Candidate");
const User = require("./models/User");


const seedCandidates = async () => {
  await connectDB();

  try {
    // Delete existing candidates
    await User.deleteMany({});
    console.log("🧹 Old candidates cleared");

    // Add new candidates
    const candidates = [
      { name: "Alice", party: "Party A" },
      { name: "Bob", party: "Party B" },
    ];

    // await Candidate.insertMany(candidates);
    // console.log("🌱 Seeded new candidates");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding candidates:", err.message);
    process.exit(1);
  }
};

seedCandidates();
