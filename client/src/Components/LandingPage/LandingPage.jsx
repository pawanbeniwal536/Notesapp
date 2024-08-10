import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import NoteBc from '../../Assest/Note-maker-bg.png'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const LandingPage = () => {
  
  const user = localStorage.getItem('Profile');
  const navigate = useNavigate();
  useEffect(()=>{
    if(user){
    navigate('/homepage')
    }
  },[user])
  
  return (
    <>
   <div>
      <Navbar />
      <div className="landingpage-container" style={{ backgroundImage: `url(${NoteBc})` }}>
        <div className="home-container">
          <marquee className="marquee-text">Welcome to Notes Website! Create, edit, and manage your notes securely.</marquee>
          <h1>Welcome to Our Notes Website</h1>
          <p>Please select an option to proceed:</p>
          <div className="button-container">
            <Link to="/login" className="button">Login</Link>
            <Link to="/signup" className="button">Sign Up</Link>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default LandingPage;
