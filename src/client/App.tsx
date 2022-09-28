import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import Dashboard from './components/Dashboard'
import Toolbox from './components/Toolbox'
import Content from './components/Content';
import PopupForm from './components/PopupForm';
import { UserData } from './Types';
import { useUserContext } from './UserContext';

function App () {

    const { userData, setUserData } = useUserContext();
    const [authorization, setAuthorization] = useState('admin')
    const [username, setUserName] = useState('username')

    useEffect(() => {
    }, [])

    return(
        <>
        <Dashboard username={userData.username}/>
        <div id='main-container'>
          <Toolbox />
          <Content />
          <PopupForm />
        </div>
        </>
    );
}

export default App;