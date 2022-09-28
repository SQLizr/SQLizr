import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import { UserData } from '../Types';
import { useUserContext } from '../UserContext';


function Login() {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const form = document.getElementById('loginForm');
  //   form?.addEventListener('submit', verifyLogin);
  // }, []);
  
  const verifyLogin: FormEventHandler = (e: FormEvent) => {
    // this prevents refresh on form submission
    e.preventDefault();
    const target = e.target as Element;
    const username = (target.children[0] as HTMLInputElement).value;
    const password = (target.children[1] as HTMLInputElement).value;

    axios.post('/login/verify', {
      username,
      password
    }).then((res) => (res.data[0]))
    .then((data: UserData) => {
      // prop drill a function to setUserData in a higher component
      // redirect to dashboard page
      setUserData(data);
      navigate('/dashboard');
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="login-container">
    <div className='login-content'>
         <img className ="login-logo" src='https://user-images.githubusercontent.com/34523493/192654338-e3f8b798-cb97-4878-befd-dacd6265bc15.png' alt="SQLizr logo"></img>

      <div className='p-3'>
        <header>Login</header>
        <form
          className='loginForm'
          id='loginForm'
          onSubmit={verifyLogin}
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
        <Link to='/signup'>
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
