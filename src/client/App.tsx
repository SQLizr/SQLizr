import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import Dashboard from './components/Dashboard'
import Toolbox from './components/Toolbox'
import Content from './components/Content';
import PopupForm from './components/PopupForm';
import { UserData } from './Types';
import { useUserContext } from './UserContext';
import { Flex, HStack, Image } from '@chakra-ui/react';

export function Header() {
  return (
    <HStack background="#39074d" w="100%" h="50px">
      <Flex>
        <Image 
        src='https://user-images.githubusercontent.com/34523493/192654338-e3f8b798-cb97-4878-befd-dacd6265bc15.png' 
        height="50px"
        alt="SQLizr logo" />
      </Flex>
    </HStack>
  )
}

function App() {

    const { userData, setUserData } = useUserContext();
    const [authorization, setAuthorization] = useState('admin')
    const [username, setUserName] = useState('username')

    useEffect(() => {
    }, [])

    return(
        <>
        <Header />
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