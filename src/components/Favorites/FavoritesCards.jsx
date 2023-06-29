import React from 'react'
import './FavoritesCards.css';

export default function FavoritesCards() {

    const divArray = [];
    for (let i = 0; i < localStorage.length/2; i++){
        const key1 = `selectedCards_${i}`;
        const value = localStorage.getItem(key1);
        const objectArray = JSON.parse(value);
        const pasadoArray = [objectArray[0].spanishName, objectArray[0].meaning];
        const presenteArray = [objectArray[1].spanishName, objectArray[1].meaning];
        const futuroArray = [objectArray[2].spanishName, objectArray[2].meaning];

        const key2 = `Date_${i}`;
        const savedDate = localStorage.getItem(key2);
      
        divArray.push(
          <div key={key1} className='savedBox'>
            <div className='date'>{savedDate}</div>
          <div className='line'><strong>Pasado:</strong> {pasadoArray[0]}, {pasadoArray[1]}</div>
          <div className='line'><strong>Presente:</strong> {presenteArray[0]}, {presenteArray[1]}</div>
          <div><strong>Futuro:</strong> {futuroArray[0]}, {futuroArray[1]}</div>
      </div>
    );
    }
    const reversed = divArray.reverse()
  
  return (
    <div>
        {reversed}

    </div>
  )
}
