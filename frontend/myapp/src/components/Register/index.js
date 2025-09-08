import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css"

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password, role };

    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        setMessage("✅ Registered successfully!");
        setTimeout(() => {
          navigate("/login"); // ✅ correct way
        }, 1000);
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Try again!");
    }
  };

  return (
    <div class="form-container">
      <div>
        <h2>
          Welcome to Job portal <br />
          <span>Register here!</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username </label> <br/>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email </label> <br/>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password </label> <br/>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role </label> <br/>
          <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Register</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Register;
