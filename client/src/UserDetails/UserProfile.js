import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const userlogin =  localStorage.getItem('token')
    if(!userlogin){
      navigate('/signin')
      
    }

  })

  useEffect(()=>{
    const userdetails = axios.get("")
  })


  return (
    <div>UserProfile</div>
  )
}

export default UserProfile