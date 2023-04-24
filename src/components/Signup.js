import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import "../static/Signup.css"
import mic from "../static/images/podcast-mic-1920.png"

export const Signup = () => {
    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();
    const handleClick=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username,email,password}),
        });
        const json = await response.json();
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            navigate("/")
        }
        else{
            alert("Invalid credential!")
        }
        console.log(json);        
    }
  return (
    <>
    <img className="mic-bg" src={mic} alt=""/>
    <div className="log-cont">
        <div class="login-text">SignUp</div>
        <form>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" id="username" name="username" className="form-control" aria-describedby="emailHelp" value={username} onChange={e=>{setName(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" id="email" name="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={e=>{setEmail(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" id="password" name="password" className="form-control" value={password} onChange={e=>{setPassword(e.target.value)}}/>
        </div>
        <button type="submit" className="btn btn-dark w-100 my-4" onClick={handleClick}>Create an account</button>
        </form>
    </div>
    </>
  )
}