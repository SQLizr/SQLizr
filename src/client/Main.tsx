import React, { useState, useEffect, useContext, useMemo, createContext, ChangeEvent } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/404';
import { UserData } from './Types';
import { UserContext, useUserContext } from './UserContext'


function Main() {
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const updateLogIn = (bool:boolean) => {
    setLoggedIn(bool);
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Login loggedIn={loggedIn} updateLoggedIn={(bool:boolean) => updateLogIn(bool)}/>}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={ loggedIn ? (<App />) : (<Navigate replace to={'/'}/>)}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </>
    )
  );
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default Main;