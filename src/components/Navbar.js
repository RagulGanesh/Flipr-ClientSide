import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../static/index.css"
import "../static/Navbar.css"
import logo from "../static/images/logo.jpg"

export const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/signup")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark h-50" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand brand-name" to="/">
            <img src={logo} alt="logo" />
            Podify
          </Link>
          <button className="navbar-toggler float-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ham" id="navbarSupportedContent">
            {localStorage.getItem('token') && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="home-text nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>}
            {!localStorage.getItem('token') ? <form className="d-flex position-absolute end-0 mx-5" role="search">
              <Link to="/login" className="btn btn-dark mx-2" type="submit">
                Login
              </Link>
              <Link to="/signup" className="btn btn-dark" type="submit">
                Sign up
              </Link>
            </form> :
              <div class="btn-group user-btn ro float-right">
                <button class="dropdown-toggle user-btn" type="button" data-bs-toggle="dropdown" data-bs-display="static"
                  aria-expanded="false">
                  <i class="fa-solid fa-xl fa-user"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menuu">
                  <li><Link class="dropdown-item" to="/profile"><i class="fa-solid fa-user pos1"
                    ></i>Profile</Link></li>
                  <li><Link class="dropdown-item" to="/profile"><i class="fa-solid fa-gear pos1"
                    ></i>Settings</Link></li>
                  <li onClick={handleLogout} ><Link class="dropdown-item"><i class="fa-solid fa-right-from-bracket pos1"
                    ></i>Logout</Link></li>
                </ul>
              </div>
            }
          </div>
        </div>
      </nav>
    </>
  );
};