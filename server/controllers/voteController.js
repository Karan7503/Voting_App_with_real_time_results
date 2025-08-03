const Vote = require("../models/Vote");
const User = require("../models/User");
const Candidate = require("../models/Candidate");

const castVote = async (req, res) => {
  try {
    const voterId = req.user.userId;
    const candidateId = req.params.candidateId;

    if (!candidateId) {
      return res.status(400).json({ msg: "Candidate ID is required" });
    }

    // 1. Fetch voter from User collection
    console.log("Decoded User ID:", voterId);

    const voter = await User.findById(voterId);
    console.log("User found:", voter);

    if (req.user.role !== "voter") {
      return res.status(403).json({ msg: "Only voters can vote" });
    }

    // 2. Check if already voted
    if (voter.hasVoted) {
      return res.status(400).json({ msg: "You have already voted" });
    }

    // 3. Validate candidate from Candidate model
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(400).json({ msg: "Invalid candidate" });
    }

    // 4. Record vote
    await Vote.create({ voter: voter._id, candidate: candidate._id });

    // 5. Update hasVoted and votedFor fields
    voter.hasVoted = true;
    voter.votedFor = candidate._id;
    await voter.save();

    // 6. Increment voteCount
    candidate.voteCount += 1;
    await candidate.save();

    res.status(201).json({ msg: "Vote cast successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $group: {
          _id: "$candidate",
          voteCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "_id",
          foreignField: "_id",
          as: "candidateInfo",
        },
      },
      {
        $unwind: "$candidateInfo",
      },
      {
        $project: {
          _id: 0,
          candidateId: "$candidateInfo._id",
          name: "$candidateInfo.name",
          email: "$candidateInfo.email",
          votes: "$voteCount",
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { castVote, getResults };
