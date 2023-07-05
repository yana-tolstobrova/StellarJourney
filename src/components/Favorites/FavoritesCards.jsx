import React from 'react'
import './FavoritesCards.css';

export default function FavoritesCards() {
    const savedData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('Saved_')) {
      const data = localStorage.getItem(key);
      savedData.push(JSON.parse(data));
    }
  }
      
  const divArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        divArray.push(
          <div key={i} className='savedBox'>
          <div className='date'>{savedData[i].date}</div>
          <div className='line'><strong>Pasado:</strong> {savedData[i].selectedCards[0].meaning}</div>
          <div className='line'><strong>Presente:</strong> {savedData[i].selectedCards[1].meaning}</div>
            <div><strong>Futuro:</strong> {savedData[i].selectedCards[2].meaning}</div>
            <div>{savedData[i].textareaValue}</div>
            <textarea value={savedData[i].textareaValue}></textarea>
      </div>
    );
    }
  return (
    <div>
        {divArray.reverse()}
    </div>
  )
}
