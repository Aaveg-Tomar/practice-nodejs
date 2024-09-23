import React, { useEffect, useState } from 'react';
import axios from 'axios';


const JobList = () => {

  const [jobDetails, setJobDetails] = useState(null); // initial state is null
const [error, setError] = useState(null);

useEffect(() => {
  const handleJobList = async () => {
    try {
      const jobDetailsAll = await axios.get("http://localhost:8000/api/joblistDetail", {
        withCredentials: true,
      });

      if (jobDetailsAll.data.status === 'ok') {
        setJobDetails(jobDetailsAll.data.jobList);
      } else {
        setError('Error fetching job details');
      }
    } catch (err) {
      console.log(err);
      setError('Network error occurred');
    }
  };

  handleJobList();
}, []);

  useEffect(() => {
    if (jobDetails) {
      console.log("Job Details:", jobDetails);
    }
  }, [jobDetails]);


  const handleJobSubmit = async (jobId) => {
    try {
      const response = await axios.post("http://localhost:8000/api/submitJob", {
        jobId: jobId,
      }, {
        withCredentials: true,
      });
      // Handle success response if needed
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error('Error submitting job details:', error.message);
    }
  };

  return (
    <div>
    {error && <p>{error}</p>}
    
    {!jobDetails ? ( // Check if jobDetails is still null or empty
      <p>Loading job details...</p>
    ) : (
      jobDetails.length > 0 ? (
        jobDetails.map((job) => (
          <div key={job._id}>
            <h2>{job.jobTitle}</h2>
            <h2>{job.companyName}</h2>
            <p>{job.jobDescription}</p>
            <p>{job._id}</p>
            <button type='submit' onClick={() => handleJobSubmit(job._id)}>Submit</button>
          </div>
        ))
      ) : (
        <p>No jobs available</p>
      )
    )}
  </div>


  )
}

export default JobList