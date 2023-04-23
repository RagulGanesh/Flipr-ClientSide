import React, { useEffect, useState } from 'react'

// import "../static/index.css"

export const Profile = () => {
    const [data, setData] = useState({});
    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/api/user/getuser`, {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },

    })
    const json = await response.json();
    setData(json);
    }
    useEffect(()=>{
        getUser();
    },[])
    return (
    <div>
      <div class="email">{data.email}</div>
      <div class="Name">{data.username}</div>
      <div class="role">{data.role}</div>
    </div>
  )
}

