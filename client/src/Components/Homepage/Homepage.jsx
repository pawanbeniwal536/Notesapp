import React from 'react'
import './Homepage.css'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


const Homepage = () => {
  return (
    
    <div className="homepage-container">
        <Navbar/>
        
        <div className="home-call-cls ">
        <Home/>
        </div>
        
        <div className="footer-call-cls">
        <Footer/>
        </div>
    </div>
  )
}

export default Homepage
