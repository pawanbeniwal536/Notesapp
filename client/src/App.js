import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Homepage from './Components/Homepage/Homepage';
import NotesList from './Components/NotesList/NotesList';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import UserProfile from './Components/UserProfile/UserProfile';
import store from './store/store';
import { Provider  } from 'react-redux' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const App = () => {
  return (
  <>
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/home/user-id/notes'element={<NotesList/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/user-profile/:id' element={<UserProfile/>}/>
      </Routes>
    </Router>
  </Provider>
  </>
  )
}

export default App