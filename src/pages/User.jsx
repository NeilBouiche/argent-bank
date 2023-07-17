import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, setToken } from '../utils/apiSlice';
import { toggleEditName, updateUserProfile } from '../utils/uiSlice';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import Accounts from '../components/Accounts';
import { useNavigate } from 'react-router';


export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.api.user);
  const token = useSelector((state) => state.api.token) || localStorage.getItem("token");
  const isEditingName = useSelector((state) => state.ui.isEditingName);

  useEffect(() => {}, [user]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    dispatch(
      updateUserProfile({
        token,
        firstName,
        lastName,
      })
    );
    dispatch(fetchUserProfile(token));
    dispatch(toggleEditName());
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    } else {
      navigate('/sign-in');
    }
  }, [dispatch, navigate, token]);

  return (
    <div>
      <MenuBar />
      <main className='main bg-dark'>
        <div className='header'>
          <h1>
            Welcome back
            <br />
            {!isEditingName
              ? user
                ? user.firstName + ' ' + user.lastName
                : '' + '!'
              : ''}
          </h1>{' '}
          {!isEditingName ? (
            <button
              className='edit-button'
              onClick={() => dispatch(toggleEditName())}>
              Edit Name
            </button>
          ) : (
            ' '
          )}
          {isEditingName ? (
            <form action='PUT' onSubmit={handleFormSubmit}>
              <div className='name-edit-container'>
                <div className='name-edit-item'>
                  <input
                    type='text'
                    id='firstName'
                    className='name-edit-input'
                    placeholder={user.firstName}
                    required
                  />
                  <button type='submit' className='name-edit-button'>
                    Save
                  </button>
                </div>
                <div className='name-edit-item'>
                  <input
                    type='text'
                    id='lastName'
                    className='name-edit-input'
                    placeholder={user.lastName}
                    required
                  />
                  <button
                    id='last-name-edit-button'
                    className='name-edit-button'
                    onClick={() => dispatch(toggleEditName())}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ''
          )}
        </div>
        <Accounts />
      </main>
      <Footer />
    </div>
  );
}
