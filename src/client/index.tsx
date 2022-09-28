import { createRoot, Root } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/404';

import '../public/styles.scss';
import '../public/signUp.scss';
import '../public/login.scss';
import e from 'express';


const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) throw new Error('Fail to get root element in index.ts');

const root: Root = createRoot(rootElement);

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

root.render(
  <RouterProvider router={router} />
);
