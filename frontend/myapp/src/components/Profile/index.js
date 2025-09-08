import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://127.0.0.1:8000/profile/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUser(res.data))
    .catch(() => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
    });
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToJobs = () => {
    navigate("/jobs"); // 👈 Redirect to jobs page
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Hello, {user.username}</h2>
      <p>Email: {user.email}</p>

      <button onClick={logout}>Logout</button>
      <button onClick={goToJobs}>Go to Jobs</button> {/* 👈 Button to redirect */}
    </div>
  );
};

export default Profile;
