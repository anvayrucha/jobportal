import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import axios from "axios";

const JobList = () => {
    
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ hook

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get-job");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setJobs([]); // fallback to empty list if error
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  if (loading) return <p>Loading job listings...</p>;

  return (
    <div>
      <h2>All Job Openings</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              {job.title} <br />
              {job.company} <br />
              {job.location} <br />
              {/* ✅ Redirect to apply page */}
              <button onClick={() => navigate(`/jobs/${job.id}/apply`)}>
                Apply
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
