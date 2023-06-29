import React from 'react'
import Background from '../components/Background/Background'
import FavoritesCards from '../components/Favorites/FavoritesCards'
import { NavBar } from '../components/NavBar/NavBar'

export default function Favorites() {
  return (
      <div>
          <NavBar />
          <FavoritesCards />
          <Background />
    </div>
  )
}
