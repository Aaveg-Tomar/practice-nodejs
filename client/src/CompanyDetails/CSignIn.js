import React, { useEffect, useState } from 'react'
import  { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const history = useNavigate();

    useEffect(()=>{
        const localdata = localStorage.getItem('token');
        if(localdata){
          history('/dashboard');       
        }
      },[])

    const loginUser = async(e) =>{
        e.preventDefault();

        const dataSend = {
            email ,  password
    
        }
    
        const response=await axios.post('http://localhost:8000/api/clogin',dataSend, {
            withCredentials: true // Make sure to include credentials in the request
        });

        

        if(response.data.status === true){
            localStorage.setItem('token', response.data.token);
            
            alert("Login Sccessfull");
            window.location.href = '/dashboard'
        }else{
            alert("check username or password")
        }
        
        
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>

                <input value={email} 
                onChange={(e) => setEmail(e.target.value)}
                type='email' 
                placeholder='Email' />

                <input value={password} 
                onChange={(e) => setPassword(e.target.value)}
                type='password' 
                placeholder='Password' />

                <input type='submit' value="Login"/>

            </form>
        </div>
    )
}

export default CSignIn