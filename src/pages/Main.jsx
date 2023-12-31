import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import Cards from '../components/Cards/Cards'
import BoxForCards from '../components/Cards/BoxForCards'
import Background from '../components/Background/Background'


export default function Main() {
  return (
    <div>
      <NavBar />
      <BoxForCards/>
      <Cards />
      <Background />
    </div>
  )
}
