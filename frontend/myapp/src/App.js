import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar"; // ⬅️ Import the navbar
import JobList from "./components/JobList"
import Home from "./components/Home"
import JobCandidateForm from "./components/JobCandidateForm/index.js"

import './App.css';

function App() {
  return (
    <Router>
      <Navbar/> {/* ⬅️ Add Navbar here */}
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/jobs" element={<JobList />} />
         <Route path="/jobs/:jobId/apply" element={<JobCandidateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
