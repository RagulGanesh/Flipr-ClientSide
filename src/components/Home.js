import React, { useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate("/")
        }
        else{
          navigate("/signup")
        }
        
      }, []);
  return (
    <div>Welcome</div>
  )
}
