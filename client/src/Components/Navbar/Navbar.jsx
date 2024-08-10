import React from 'react';

import { Link, Navigate, useLocation,useNavigate } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  
 const navigate = useNavigate();

 const userParse = localStorage.getItem('Profile');
 const user = JSON.parse(userParse);
 const userId = user?.data?.message?._id
 const userFirstLetter = user?.data?.message.Name.charAt(0).toUpperCase()

  const handleLogout = () => {
     const confirmation = window.confirm('Are you sure for logout');
     if(confirmation){
      localStorage.clear();
      navigate('/')
      window.location.reload()
     }
  };

  const location = useLocation();
  const path = location.pathname;

  return (
<div className="navbar-cls">
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Notebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${path === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${path === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${path === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
          </ul>
  
          <div className="d-flex align-items-center user-name-logout-btn">
            {user ? (
              <>
                <Link to={`/user-profile/${userId}`} className="user-initials bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-2">
                  {userFirstLetter}
                </Link>
                <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-primary ms-2">Login</Link>
            )}
          </div>
      </div>
      </div>
    </nav>
        </div>
  );
};

export default Navbar;
