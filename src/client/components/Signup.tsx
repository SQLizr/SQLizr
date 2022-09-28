import React from 'react';
import '../../../src/public/styles.scss';

function SignUp() {
  return (
    <div className='signup'>
      <div className="signup__container">
        <h2>Sign Up</h2>
        <header>Sign Up Information</header>
        <form
          className='signUpForm'
          id='signUpForm'
          method='POST'
          action='/signup'
        >
          <input
            className='username'
            type='text'
            id='username'
            name='username'
            placeholder='Create Username'
          />
          <input
            className='password'
            type='password'
            id='password'
            name='password'
            placeholder='Create Password'
          />

          <button type='submit'>Sign Up</button>
          {/* Create account button makes fetch request onClick, if truthy redirect to /settings */}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
