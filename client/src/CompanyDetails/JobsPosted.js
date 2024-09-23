import axios from 'axios';
import React, { useState, useEffect } from 'react';


const JobsPosted = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsPosted = async () => {
      try {
        const jobdatas = await axios.get("http://localhost:8000/api/showjobs", {
          withCredentials: true,
        });

        if (jobdatas.data.status === 'ok') {
          setJobDetails(jobdatas.data.jobsdetails); 
        } else {
          setError('Error fetching job details');
        }
      } catch (err) {
        setError('Error fetching job details');
        console.log(err);
      }
    };

    fetchJobsPosted();
  }, []); 

  // Track jobDetails once it's updated
  useEffect(() => {
    if (jobDetails) {
      console.log("Job Details:", jobDetails);
    }
  }, [jobDetails]);

  // Handling null or empty state for jobDetails
  if (!jobDetails) {
    return <div>Loading job details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleApplicantsListOnJob = async(jobId) =>{
    console.log("Applicants List on Job");
    try {
      const response = await axios.post("http://localhost:8000/api/applicantDetails", {
        jobId: jobId,
      }, {
        withCredentials: true,
      });
      // Handle success response if needed
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error('Error finding the Applicants', error.message);
    }
    
  }

  return (
    <div>
      <h1>Jobs Posted</h1>
      {jobDetails.length === 0 ? (
        <div>No jobs posted yet.</div>
      ) : (
        jobDetails.map((job, index) => (
          <div key={index}>
            <h2>{job.jobTitle}</h2>
            <p>{job.jobDescription}</p>
            <p>Location: {job.jobLocation}</p>
            <p>Salary: {job.salary}</p>
            <hr />
            <button type='submit' onClick={()=>handleApplicantsListOnJob(job._id)}>Applicant List</button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobsPosted;
