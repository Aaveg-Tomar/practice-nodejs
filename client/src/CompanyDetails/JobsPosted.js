import axios from 'axios';
import React, { useState , useEffect } from 'react'

const JobsPosted = () => {
  const [jobDetails , setJobDetails] = useState('');
  const [error , setError] = useState('');

  useEffect(()=>{
    

    const fetchJobsPosted = async() => {
      const jobdatas = await axios("http://localhost:8000/api/showjobs");
    

    if (jobdatas.data.status === 'ok') {
      setJobDetails(jobdatas.data.details);
      console.log(jobDetails);
  } else {
      setError('Error fetching user details');
      console.log(error);
  }
    }
  },[])


  return (
    <div>JobsPosted</div>
  )
}

export default JobsPosted