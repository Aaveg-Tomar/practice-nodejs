import axios from 'axios';
import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const userlogin =  localStorage.getItem('token')
    if(!userlogin){
      navigate('/signin')
      
    }

    const handleUserData = async() => {
      const userdata = await axios("http://localhost:8000/api/user/details");
    

    if (userdata.data.status === 'ok') {
      setUserDetails(userdata.data.details);
      console.log(userDetails);
  } else {
      setError('Error fetching user details');
  }
    }
  })

  


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