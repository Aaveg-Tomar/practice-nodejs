import React, { useEffect, useState } from 'react'
import  { useNavigate } from 'react-router-dom';

const SignIn = () => {
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
        e.preventDefault()
        const response = await fetch('http://localhost:8000/api/login' , {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },

            body : JSON.stringify({
                email,
                password,
            })
        })

        const data = await response.json();
        console.log(data)
        

        if(data.status === true){
            localStorage.setItem('token', data.token);
            
            alert("Login Sccessfull");
            window.location.href = '/dashboard'
        }else{
            alert("check username or password")
        }
        
        console.log(data);
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

export default SignIn