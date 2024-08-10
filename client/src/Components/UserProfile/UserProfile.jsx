import React from 'react';
import './UserProfile.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { DeleteUser } from '../../action/auth';
import { useDispatch } from 'react-redux';


const UserProfile = () => {

  const navigate = useNavigate();

   const userParse = localStorage.getItem('Profile')
   const user = JSON?.parse(userParse)
   const userId = user?.data?.message?._id
   const dispatch = useDispatch();

  // handle for logout from the account
  const handleLogout = () => {
    const confirmation = window.confirm('Do you want logout ')
    if (confirmation) {
      localStorage.clear();
      navigate('/');
      window.location.reload()
    }
  }

    // handle for Permanently delete account from the database. 
    const handleDelete = () => {
      let confirmation = window.confirm('Are you sure for delete an account')
      if(confirmation){
        localStorage.clear()
      dispatch(DeleteUser(userId))
      navigate('/')
      window.location.reload()
      }
    }

    // for navigate on home 
  const handleHome = () => {
    navigate('/')
  }

  // access the data from the localstorage variable
  const currentProfile = {
    name: user?.data?.message?.Name,
    email: user?.data?.message?.Email,
    joined: user?.data?.message?.Date
  };

  return (
    <>
      {
        user ? (
          <div>
            <Navbar />
            <div className="profile-main-container">
              <div className='profile-container '>

                <main className='main-content'>
                  <section className='profile-section'>
                    <div className='profile-header'>
                      <div className='profile-avatar'>
                        <div className='avatar'>
                          {currentProfile?.name?.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className='profile-details '>
                        <h1>{currentProfile?.name}</h1>
                      </div>

                      <div className='log-out-button' onClick={handleLogout}>
                        Log Out
                      </div>

                    </div>
                    <div className='profile-content'>

                      <div>
                        <h2 className='text-green-500'>Profile Bio</h2>
                        <p><strong>Name :</strong> {currentProfile.name}</p>
                        <p><strong>Email :</strong> {currentProfile.email}</p>
                        <p><strong>Joined :</strong> {moment(currentProfile.joined).format('MMMM Do YYYY')}</p>
                      </div>
                    </div>
                    <div className="delete-profile-btn">
                      <button onClick={handleDelete}>Delete Account Permanently</button>
                    </div>
                  </section>
                </main>
              </div>
            </div>
            <Footer />
          </div>
        ) :
          (
            <div className="for-home-container">
              <p>Path Not Found</p>
              <button className='bg-blue-600 pl-3 pr-3 pt-2 pb-2 text-white items-center' onClick={handleHome}>GO TO HOME</button>
            </div>
          )
      }
    </>
  );
};
export default UserProfile;