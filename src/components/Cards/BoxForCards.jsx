import React from 'react'
import './Cards.css';

export default function BoxForCards() {
  return (
    <div>
      <ul className='timeline'>
              <li className='selectedCard'>
                  <span>Pasado</span>
                  <div className='cardbox'></div>
              </li>
              <li className='selectedCard'>
                  <span>Presente</span>
                  <div className='cardbox'></div>
              </li>
              <li className='selectedCard'>
                  <span>Futuro</span>
                  <div className='cardbox'></div>
              </li>
          </ul>
    </div>
  )
}
