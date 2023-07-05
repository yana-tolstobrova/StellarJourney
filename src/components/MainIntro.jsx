import React from 'react'
import { Link } from 'react-router-dom'
import Hands from '../assets/hands-image.svg'
import Logo from '../assets/logo.svg'
import Background from '../assets/bg-desktop.svg'
import './MainIntro.css'

export default function MainIntro() {
  return (
      <div className='main-intro-container'>
          <div className='bg-image-container'><img src={Background} alt='backgroung img' className='bg-image'></img></div>
      <div className='main-intro'>
            <img src={Logo} alt='Stellar Journey logo' className='logo'></img>
            <img src={Hands} alt='hands with moon and starts' className='hands'></img>
            <h1>Bienvenidos a Clow Tarot!</h1>
            <p className='textIntro'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat magnam temporibus modi similique quas animi neque ea, veniam accusamus vitae libero vel error.</p>
            <Link to='/Main'><button>Saber mi destino</button></Link>
      </div>
    </div>
  )
}
