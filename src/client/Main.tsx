import React, { useState, useEffect, useContext, useMemo, createContext, ChangeEvent } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/404';
import { UserData } from './Types';
import { UserContext } from './UserContext'


function Main() {
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: "/dashboard",
      element: <App />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default Main;