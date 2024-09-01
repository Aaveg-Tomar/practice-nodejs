import React, { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'
import { useNavigate } from 'react-router-dom'

const UserFrom = () => {
  const navigate = useNavigate();


  useEffect(()=>{
    const userlogin =  localStorage.getItem('token');
    if(!userlogin){
      navigate('/signin');
    }


  },[])


  const [fullName, setFullName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [phnNumber, setPhnNumber] = useState(0);
  const [marks10th, setMarks10th] = useState('');
  const [marks12th, setMarks12th] = useState('');
  const [btechMarks, setBtechMarks] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMarks = {
      marks10th,
      marks12th,
      btechMarks,
    };

    const data = {
      fullName,
      collegeName,
      phnNumber,
      userMarks,
      email,
    };

    try {
      const response = await fetch('http://localhost:8000/api/userform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const userres = await response.json();
      if (userres.status === 'ok') {
        console.log('User details saved:', userres.user);
        navigate('userProfile')
      } else {
        console.log('Error saving user details');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };



  return (
    <>
      <div>UserDetails</div>
      <form onSubmit={handleSubmit}>
        <label>Enter Full Name</label>
        <input
          type="text"
          placeholder="Enter the name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter the email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Enter Mobile Number</label>
        <input
          type="number"
          placeholder="9758XXXXXX"
          value={phnNumber}
          onChange={(e) => setPhnNumber(e.target.value)}
        />

        <label>Enter College Name</label>
        <input
          type="text"
          placeholder="XYZ  College"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />

        <label>Enter 10th Marks</label>
        <input
          type="number"
          placeholder="Enter 10th marks"
          value={marks10th}
          onChange={(e) => setMarks10th(e.target.value)}
        />

        <label>Enter 12th Marks</label>
        <input
          type="number"
          placeholder="Enter 12th marks"
          value={marks12th}
          onChange={(e) => setMarks12th(e.target.value)}
        />

        <label>Enter B.Tech Marks</label>
        <input
          type="number"
          placeholder="Enter B.Tech marks"
          value={btechMarks}
          onChange={(e) => setBtechMarks(e.target.value)}
        />

        <p> Upload the Resume </p>
        <FileUpload />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UserFrom;
