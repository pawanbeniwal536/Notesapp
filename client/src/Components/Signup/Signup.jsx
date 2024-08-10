import React, { useEffect, useState } from 'react';
import './Signup.css';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignUp,GetUser } from '../../action/auth'


const Signup = () => {
  
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const userData = useSelector(state=>state.auth?.user)
  const authState = useSelector(state => state?.auth)
  
  // useeffect used for prevent from gone on the home page
  useEffect(() => {
    const user = localStorage.getItem('Profile');
    if (user) {
      navigate('/homepage');
    }
  }, [navigate]);

  // useeffect used for after getting user land on homepage
  useEffect(()=>{
    if(userData){
      navigate('/homepage')
    }
  },[userData])

// for validation of the email
const validateEmail = (email) => {
  const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return re.test(email);
};

  // for submit the form
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page

    if (!email ||!name || !password ) {
      alert('Fill all required fileds');
      return;
    }

    if(name.length<3){
      alert('Enter a valid username')
    }
    if (!validateEmail(email)) {
      alert('invalid email');
    }

    if(password.length<8){
      alert('Create a strong password')
    }

    dispatch(SignUp(name,email,password))

  };

  // for check token is received or not
  useEffect(() => {
    if (authState?.data) {
      dispatch({type:'RESET_AUTH_DATA'})
    }
    if (authState?.error) {
      alert( (authState.error.data.message || 'Unknown Error'));
      dispatch({type:'RESET_AUTH_DATA'})
    }
  }, [authState,dispatch, navigate]);

  return (
    <>
    {authState.loading?
    <div className="loading-container">
      <h1>Loading...</h1>
    </div>:
    (
    <div className="signup-super-container">
      <div className="signup-container">
        <h1 className='signup-heading'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
          <div className="user-already-exist pt-2 flex justify-center"> User already exist? <Link to='/login' className='login-link'>Log in</Link></div>
        </form>
      </div>
    </div>
    )
}
    </>
  );
};

export default Signup;
