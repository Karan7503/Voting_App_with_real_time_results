
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const token = localStorage.getItem("token");
  console.log("Token on Dashboard:", localStorage.getItem("token"));

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/v1/candidate", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("API Response:", res.data);
        setCandidates(res.data.candidates);
      })
      .catch(() => alert("Unauthorized or server error"));
  }, []);

  const vote = async (candidateId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/vote/${candidateId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Vote error:", data);
        alert(data.message || "Voting failed.");
        return;
      }

      alert("Voted successfully!");
    } catch (err) {
      console.error("Network error while voting:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Vote for Your Candidate</h2>
      {candidates.map((c) => (
        <div key={c._id}>
          <h4>
            {c.name} ({c.party})
          </h4>
          <button onClick={() => vote(c._id)}>Vote</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
