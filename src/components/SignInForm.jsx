import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, setEmail, setPassword } from '../utils/apiSlice';
import { useNavigate } from 'react-router';

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.api.email);
  const password = useSelector((state) => state.api.password);

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(loginAsync({ email, password }))
      .then((payload) => {
        const token = payload.payload;
        if (token) {
          navigate('/user');
        } else {
          alert("L'utilisateur n'est pas dans la base de donnée");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className='input-wrapper'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
          </div>
          <div className='input-remember'>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button className='sign-in-button' type='submit'>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
