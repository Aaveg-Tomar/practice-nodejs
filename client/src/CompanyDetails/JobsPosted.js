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

  return (
    <div>
      <h1>Jobs Posted</h1>
      
    </div>
  );
};

export default JobsPosted;
