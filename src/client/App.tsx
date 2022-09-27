import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import Dashboard from './components/Dashboard'
import Toolbox from './components/Toolbox'
import Content from './components/Content';
import PopupForm from './components/PopupForm';

function App () {

    const [authorization, setAuthorization] = useState('admin')
    const [username, setUserName] = useState('username')

    return(
        <>
        <Dashboard username={username}/>
        <div id='main-container'>
          <Toolbox />
          <Content />
          <PopupForm />
        </div>
        </>
    );
}

export default App;