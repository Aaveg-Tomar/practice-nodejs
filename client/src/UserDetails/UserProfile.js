import axios from 'axios';
import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
 

  useEffect(()=>{

    const handleUserData = async() => {
      const userdata = await axios.get("http://localhost:8000/api/user/details" , {
        withCredentials : true,
      });
    

    if (userdata.data.status === 'ok') {
      setUserDetails(userdata.data.details);
      console.log(userDetails);
  } else {
      setError('Error fetching user details');
      console.log(error);
  }
    }
    handleUserData();
  },[]);

  useEffect(() => {
    if (userDetails) {
      console.log("Job Details:", userDetails);
    }
  }, [userDetails]); 

  


  return (
    <>
    <div>
      <h1>User Profile</h1>
    </div>    
    
    </>
  )
}

export default UserProfile