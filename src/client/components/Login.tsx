import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useNavigate, Link, redirect } from 'react-router-dom';
import axios from 'axios';
import { LoginProps, UserData } from '../Types';
import { useUserContext } from '../UserContext';
import '../../../src/public/login.scss';


function Login(props: LoginProps) {
  const { setUserData } = useUserContext();
  const [loginError, setLoginError] = useState<boolean>(false);
  const navigate = useNavigate();

  // note1: minor bug? this useEffect prevents users from going back
  // to the /login page if they are logged in
  // note2: this useEffect is to counteract the delay between
  // navigativng to /dashboard and the state "loggedIn" changing
  useEffect(() => {
    if (props.loggedIn) navigate('/dashboard');
  }, [props.loggedIn]);

  const verifyLogin: FormEventHandler = (e: FormEvent) => {
    // this prevents refresh on form submission
    // refreshes are bad, because it resets state
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
        if (data) {
          setUserData(data);
          props.updateLoggedIn(true);
        }
        else {
          setLoginError(true);
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login-container">
      <div className='login-content'>
        <img className="login-logo" src='https://user-images.githubusercontent.com/34523493/192654338-e3f8b798-cb97-4878-befd-dacd6265bc15.png' alt="SQLizr logo"></img>

        <div className='p-3'>
          <header>WELCOME!</header>
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
          {
            loginError &&
            <div className='error-message' id='login-error'>
              Please check your username and password and try again.
            </div>
          }
            <button className='login_button' type='submit'>LOGIN</button>
            {/* //Login button makes fetch request onClick, if truthy links to /settings */}
          </form>
          {/* button for signing in with thirdparty */}
          <p id='signup-text' className='signup-text'>Don't have an account? Sign up now!</p>
          <Link to='/signup'>
            <button type='button'>SIGN UP</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
