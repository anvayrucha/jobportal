import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ added useNavigate

const JobCandidateForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate(); // ✅ hook for redirection

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [qualification, setQualification] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("location", location);
    formData.append("qualification", qualification);
    formData.append("work_experience", workExperience);
    if (profilePic) formData.append("profile_pic", profilePic);
    if (resume) formData.append("resume", resume);

    const token = localStorage.getItem("access");

    if (!token) {
      setError("You must be logged in to apply.");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/jobs/${jobId}/apply/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.log("ERROR:", errData);
        throw new Error(errData.detail || "Unauthorized");
      }

      const data = await res.json();
      if (data.message) {
        setMessage(data.message);

        // ✅ Reset all fields
        setName("");
        setAge("");
        setEmail("");
        setPhone("");
        setLocation("");
        setQualification("");
        setWorkExperience("");
        setProfilePic(null);
        setResume(null);

        // ✅ Redirect after a short delay (optional)
        setTimeout(() => {
          navigate("/jobs");
        }, 1500); // wait 1.5 sec to show success msg (optional)
      } else {
        setError("Something went wrong!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Apply for Job #{jobId}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> <br />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} /><br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /><br />
        <input type="text" placeholder="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} /><br />
        <textarea placeholder="Work Experience" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} /><br />

        <label>Profile Picture:</label>
        <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} /><br />

        <label>Resume:</label>
        <input type="file" onChange={(e) => setResume(e.target.files[0])} /><br />

        <button type="submit">Apply</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default JobCandidateForm;
