import React from 'react'
import { useNavigate } from 'react-router-dom';

const SignOut = () => {

    const history = useNavigate();

    const  handleSignOut = () => {
        // Sign out logic here
        localStorage.removeItem('token');
        history('/signin'); 
        

    }
  return (
    <div>
        <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default SignOut