import React, { useState } from 'react'

const JobDetail = () => {
  const [companyName , setCompanyName] = useState('');
  const [jobDescription , setJobDescription] = useState('');
  const [jobTitle , setJobTitle] = useState('');
  const [jobLocation , setJobLocation] = useState('');
  const [jobType , setJobType] = useState('');
  const [bondPeriod  , setBondPeriod] = useState('');
  const [salary , setSalary] = useState(0);
  const [marks10th, setMarks10th] = useState('');
  const [marks12th, setMarks12th] = useState('');
  const [btechMarks, setBtechMarks] = useState('');

  

  return (
    <div>JobDetail</div>
  )
}

export default JobDetail