import React from 'react';
import {Link} from 'react-router-dom'
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: pawanbeniwal012@gmail.com</p>
          <p>Phone: 7900956259</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links  ">
            <a href="https://www.facebook.com/profile.php?id=100069534045314" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://www.instagram.com/pawanbeniwal536/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/pawan-beniwal-a38327305" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link  to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Notes Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
