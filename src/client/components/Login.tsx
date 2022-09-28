import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../src/public/login.scss';

function Login() {
  // let navigate = useNavigate(); //useNavigate is react router hook
  // function handleClick() {
  //   const username = document.getElementById('username')
  //   navigate('/login/verify');
  // }

  // const submitForm = (e) => {

  // }

  return (
    <div className="login-container">
    <div className='login-content'>
         <img className ="login-logo" src='https://user-images.githubusercontent.com/34523493/192654338-e3f8b798-cb97-4878-befd-dacd6265bc15.png' alt="SQLizr logo"></img>

      <div className='p-3'>
        <header>Login</header>
        <form
          className='loginForm'
          id='loginForm'
          method='POST'
          action='/login/verify'
        >
          <input
            className='username'
            type='text'
            id='username'
            name='username'
            placeholder='Enter Username'
          />
          <input
            className='password'
            type='password'
            id='password'
            name='password'
            placeholder='Enter Password'
          />
          <button className='login_button' type='submit'>LOGIN</button>
          {/* //Login button makes fetch request onClick, if truthy links to /settings */}
        </form>
        {/* button for signing in with thirdparty */}
        <Link to='/signuppage'>
          <button type='button'>SIGN UP</button>
        </Link>
        <Link to='/dashboard'>
          <button type='button'>DEV ONLY</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Login;