import React from 'react'
import Background from '../components/Background/Background'
import MainIntro from '../components/MainIntro'
import './Intro.css'

export default function Intro() {
  return (
    <div className='container'>
      <MainIntro />
      <Background />
    </div>
  )
}
