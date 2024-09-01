import React, { useState } from 'react';
import axios from 'axios';

const JobDetail = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [bondPeriod, setBondPeriod] = useState('');
  const [salary, setSalary] = useState(0);
  const [marks10th, setMarks10th] = useState('');
  const [marks12th, setMarks12th] = useState('');
  const [btechMarks, setBtechMarks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobDetails = {
      companyName,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      bondPeriod,
      salary,
      jobEligibility: {
        marks10th,
        marks12th,
        btechMarks
      }
    };

    try {
      const response = await axios.post('http://localhost:8000/api/jobdetails', jobDetails);
      console.log(response.data);

    } catch (error) {
      console.error(error);

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company Name:</label>
        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
      </div>
      <div>
        <label>Job Title:</label>
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
      </div>
      <div>
        <label>Job Description:</label>
        <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
      </div>
      <div>
        <label>Job Location:</label>
        <input type="text" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} required />
      </div>
      <div>
        <label>Job Type:</label>
        <input type="text" value={jobType} onChange={(e) => setJobType(e.target.value)} required />
      </div>
      <div>
        <label>Bond Period:</label>
        <input type="text" value={bondPeriod} onChange={(e) => setBondPeriod(e.target.value)} required />
      </div>
      <div>
        <label>Salary:</label>
        <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} required />
      </div>
      <div>
        <label>10th Marks:</label>
        <input type="number" value={marks10th} onChange={(e) => setMarks10th(e.target.value)} required />
      </div>
      <div>
        <label>12th Marks:</label>
        <input type="number" value={marks12th} onChange={(e) => setMarks12th(e.target.value)} required />
      </div>
      <div>
        <label>B.Tech Marks:</label>
        <input type="number" value={btechMarks} onChange={(e) => setBtechMarks(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobDetail;
