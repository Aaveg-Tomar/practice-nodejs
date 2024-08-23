import React, { useState } from 'react'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

        if(data.user){
            
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