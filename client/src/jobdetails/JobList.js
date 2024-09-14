import React, { useEffect, useState } from 'react';
import axios from 'axios';


const JobList = () => {

  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {

    const handleJobList = async () => {
      const jobDetailsAll = await axios.get("http://localhost:8000/api/joblistDetail", {
        withCredentials: true,
      });


      if (jobDetailsAll.data.status === 'ok') {
        setJobDetails(jobDetailsAll.data.jobList);
        console.log(jobDetails);
      } else {
        setError('Error fetching user details');
        console.log(error);
      }
    }
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
    <>
      <h1>Job List Details</h1>
      <ul>
        {jobDetails.map((job, index) => (
          <li key={index}>

            <h2>{job.jobTitle}</h2>
            <p>{job.companyName}</p>
            <p>{job.jobLocation}</p>
            <button type='submit' onClick={() => handleJobSubmit(job._id)}>Submit</button>

          </li>
        ))}
      </ul>

    </>
  )
}

export default JobList