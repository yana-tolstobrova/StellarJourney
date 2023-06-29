import React from 'react';
import { Navigate, createBrowserRouter} from 'react-router-dom';
import App from './App.js'
import './index.css'
import Main from './pages/Main'
import Favorites from './pages/Favorites'

export const Router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/Main',
    element: <Main />
  },
  {
    path:'/Favorites',
    element: <Favorites />
  },
  {
    path:'*',
    element: <Navigate to="/" />
  }
])