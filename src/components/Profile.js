import React, { useEffect, useState } from 'react'
import "../static/index.css"
import "../static/Profile.css"
import user from "../static/images/user.png"

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
  useEffect(() => {
    getUser();
  }, [])
  return (
    <div className='p-body'>
      <div class="p-cont">
        <div class="user">
          <img src={user} alt="user" />
        </div>
        <div class="details">
          <div class="roww one">
            <span>Name </span>
            <div class="Name">:  {data.username}</div>
          </div>
          <div class="roww two">
            <span>Email Address </span>
            <div class="email">:  {data.email}</div>
          </div>
          <div class="roww three">
            <span>Role </span>
            <div class="role">:  {data.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

