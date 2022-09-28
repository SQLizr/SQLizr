import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../src/public/login.scss';

function Login() {
  let navigate = useNavigate(); //useNavigate is react router hook
  function handleClick() {
    navigate('/signup');
  }

  return (
    <div className="login-container">
    <div className='login-content'>
      <div>
      <img src="https://user-images.githubusercontent.com/34523493/192654337-c85cc26d-5408-4a24-9be1-163e5c594bbe.png" alt="" />
        {/* <img src='src/assets/background smaller scale.png'></img> */}
      </div>
      <div className='p-3'>
        <header>Page Not Found</header>
        
      </div>

      {/* <Link to='/scrum'>Scrum</Link>
      <Link to='/settings'>Settings</Link> */}
    </div>
    </div>
  );
}

export default Login;
