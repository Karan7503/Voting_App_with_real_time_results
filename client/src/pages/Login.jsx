import { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      console.log(token);
      
      setMessage("✅ Logged in successfully!");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.msg || "Login failed"));
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

         <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="voter">Voter</option>
          <option value="candidate">Candidate</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
