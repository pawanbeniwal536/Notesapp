import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogIn } from '../../action/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth)
  const userData = useSelector(state => state.auth?.user)

  // useeffect used for prevent from gone on the home page
  useEffect(() => {
    if (userData) {
      navigate('/homepage')
    }
  }, [userData])

  // useeffect used for after getting user land on homepage
  useEffect(() => {
    const user = localStorage.getItem('Profile');
    if (user) {
      navigate('/homepage');
    }
  }, [navigate]);

  // for validation of the email
  const validateEmail = (email) => {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return re.test(email);
  };
  

    // for submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Fill all required fields');
      return;
    }

    if (!validateEmail(email)) {
      alert("Enter a valid email");
      return;
    }

    if (password.length < 8) {
      alert('Enter a valid password');
      return;
    }

    dispatch(LogIn(email, password));
  };

  // for check token is received or not
  useEffect(() => {
    if (authState?.data) {
      dispatch({ type: 'RESET_AUTH_DATA' });
    }

    if (authState?.error) {
      alert(authState.error.data?.message || 'Unknown Error');
      dispatch({ type: 'RESET_AUTH_DATA' });
    }
  }, [authState, dispatch, navigate]);

  return (
    <>
      {
        authState.loading ?
          <div className="loading-container">
            <h1>Loading...</h1>
          </div>
          :
          <div className="login-super-container">
            <div className="login-container">
              <h1 className='login-heading'>Login</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
                <div className="user-not-exist pt-2 flex justify-center">
                  User does not exist? <Link to='/signup' className='signup-link'>Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
      }
    </>
  );
};

export default Login;
