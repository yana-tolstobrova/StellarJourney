import React from 'react'
import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
       <div>   
          <ul className='flex'>
              <li>
                  <NavLink to={'/intro'} className=''>Intro</NavLink>
      </li>
      <li>
                  <NavLink to={'/main'} className='hover:text-nav-hover text-white font-normal text-lg mr-4 xl:mr-10'>Main</NavLink>
              </li>
              <li>
                  <NavLink to={'/favorites'} className='text-white hover:text-nav-hover font-normal text-lg'>Favorites</NavLink>
              </li>
          </ul>

    </div>
  )
}
