import axios from 'axios';
import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
 

  useEffect(()=>{
    const userlogin =  localStorage.getItem('token')
    if(!userlogin){
      navigate('/signin')
      
    }

    const handleUserData = async() => {
      const userdata = await axios.get("http://localhost:8000/api/showjobs");
    

    if (userdata.data.status === 'ok') {
      setUserDetails(userdata.data.details);
      console.log(userDetails);
  } else {
      setError('Error fetching user details');
      console.log(error);
  }
    }
  },[])

  


  return (
    <>
    <div>
      <h1>User Profile</h1>
    </div>

    <div>

    </div>
    
    
    </>
  )
}

export default UserProfile