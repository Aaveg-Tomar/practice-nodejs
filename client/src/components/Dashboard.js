import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SignIn from '../UserDetails/SignIn'
import CSignIn from '../CompanyDetails/CSignIn';



const Dashboard = () => {

  // const history = useNavigate();
  // useEffect(() => {
  //   const localdata = localStorage.getItem('token');
  //   if (!localdata) {
  //     history('/signin');
  //   }
  // }, [])

  return (
    <>
      <div>Dashboard</div>
      <button><Link to='/signin' >Student Login</Link></button>
      <button><Link to='/csignin' >Company Login</Link></button>
      
    </>
  )
}

export default Dashboard