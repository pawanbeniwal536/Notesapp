import React from 'react';
import './About.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const About = () => {
  return (
    <>
      <Navbar/>
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>Welcome to NoteMaster, your ultimate digital note-taking solution. At NoteMaster, we believe that every idea, big or small, deserves a place to grow and flourish. Our mission is to provide a seamless and intuitive platform for capturing, organizing, and sharing your thoughts and ideas.</p>
        <p>Founded by a team of passionate creators and developers, NoteMaster is designed to cater to all your note-taking needs, whether you're a student, a professional, or just someone who loves to jot down ideas on the go. With features like folder organization, tagging, and powerful search capabilities, managing your notes has never been easier.</p>
        <p>Our goal is to continuously improve and innovate, ensuring that NoteMaster remains the go-to choice for anyone looking to enhance their productivity and creativity. Thank you for choosing NoteMaster, and we hope you enjoy using our platform as much as we enjoyed creating it for you.</p>
        <p>Feel free to reach out to us with any feedback or questions. Together, let's master the art of note-taking!</p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
