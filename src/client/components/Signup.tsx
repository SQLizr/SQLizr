import React from 'react';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useNavigate, Link, redirect } from 'react-router-dom';
import axios from 'axios';
import { LoginProps, UserData } from '../Types';
import { useUserContext } from '../UserContext';
import '../../../src/public/signUp.scss';

function SignUp() {
  const [signUpError, setSignUpError] = useState<boolean>(false);
  const navigate = useNavigate();

  // note1: minor bug? this useEffect prevents users from going back
  // to the /login page if they are logged in
  // note2: this useEffect is to counteract the delay between
  // navigativng to /login and the state "signedUp" changing



  const addNewUser: FormEventHandler = (e: FormEvent) => {
    // this prevents refresh on form submission
    // refreshes are bad, because it resets state
    e.preventDefault();
    const target = e.target as Element;
    const organization = (target.children[0] as HTMLInputElement).value;
    const username = (target.children[1] as HTMLInputElement).value;
    const password = (target.children[2] as HTMLInputElement).value;

    axios.post('/login/sign-up', {
      organization,
      username,
      password
    }).then((res) => (res.data[0]))
      .then((data) => {
        // prop drill a function to setUserData in a higher component
        // redirect to dashboard page
        if (data) {
          console.log(data);
          navigate('/');
          console.log('successfully signed in')
        }
        else {
          setSignUpError(true);
        }
      }).catch((err) => {
        console.log('Sign Up error is being caught!');
        setSignUpError(true);
        console.log(err);
      });
  }

  return (
    <div className='signup'>
      <div className="signup__container">
      <img className="login-logo" src='https://user-images.githubusercontent.com/34523493/192654338-e3f8b798-cb97-4878-befd-dacd6265bc15.png' alt="SQLizr logo"></img>
        <h2>Sign Up</h2>
        <form
          className='signUpForm'
          id='signUpForm'
          onSubmit={addNewUser}
        >
          <input
            className='organization'
            type='organization'
            id='organization'
            name='organization'
            placeholder='Enter Organization Name'
          />
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

          {signUpError &&
            <div className='error-message' id='signup-error'>
              This username is already taken. Please try again.
            </div>
          }
          <button type='submit'>Sign Up</button>
          {/* Create account button makes fetch request onClick, if truthy redirect to /settings */}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
