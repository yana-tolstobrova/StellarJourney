import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Intro from './pages/Intro'
import Main from './pages/Main.jsx'
import Favorites from './pages/Favorites.jsx'

const router = createBrowserRouter([
    {
        path:'/',
        element: <Intro/>
    },
    {
        path:'/main',
        element: <Main/>
    },
    {
        path:'/favorites',
        element: <Favorites/>
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>     
  </React.StrictMode>,
)