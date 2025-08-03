const User = require("../models/User");
const Admin = require("../models/Admin");
const Candidate = require("../models/Candidate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  const lowerEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  let user;
  let actualRole;

  try {
    if (role === "admin") {
      const existing = await Admin.findOne({ username: lowerEmail });
      if (existing) return res.status(400).json({ msg: "Admin already exists" });

      user = await Admin.create({ username: lowerEmail, password: hashedPassword });
      actualRole = "admin";
    } else if (role === "candidate") {
      const existing = await Candidate.findOne({ name });
      if (existing) return res.status(400).json({ msg: "Candidate already exists" });

      user = await Candidate.create({ name, party: "Default Party" });
      actualRole = "candidate";
    } else {
      const existing = await User.findOne({ email: lowerEmail });
      if (existing) return res.status(400).json({ msg: "User already exists" });

      user = await User.create({ name, email: lowerEmail, password: hashedPassword, role: "voter" });
      actualRole = "voter";
    }

    const token = jwt.sign(
      { userId: user._id, role: actualRole },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ msg: "Registered successfully", token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};




const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ msg: "Please provide email, password and role" });
  }

  const lowerEmail = email.toLowerCase();
  let user;
  let actualRole;

  try {
    if (role === "admin") {
      user = await Admin.findOne({ username: lowerEmail });
      actualRole = "admin";
    } else if (role === "candidate") {
      user = await Candidate.findOne({ name: email }); // Assuming name is used
      actualRole = "candidate";
    } else if (role === "voter") {
      user = await User.findOne({ email: lowerEmail });
      actualRole = "voter";
    } else {
      return res.status(400).json({ msg: "Invalid role" });
    }

    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: actualRole },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { register, login };
