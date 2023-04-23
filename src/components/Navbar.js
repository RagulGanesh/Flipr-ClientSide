import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';


export const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/signup")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {localStorage.getItem('token') && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>}
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link to="/login" className="btn btn-primary mx-2" type="submit">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" type="submit">
                Sign up
              </Link>
            </form> : 
            <div>
              <Link to="/profile">Profile</Link>
              <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
            </div>}
          </div>
        </div>
      </nav>
    </>
  );
};