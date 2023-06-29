import React from 'react'

export default function FavoritesCards() {

    const divArray = [];
    for (let i = 0; i < localStorage.length; i++){
          const key = `selectedCards_${i}`;
          const value = localStorage.getItem(key);
      const objectArray = JSON.parse(value);
      const pasadoArray = [objectArray[0].spanishName, objectArray[0].meaning];
      const presenteArray = [objectArray[1].spanishName, objectArray[1].meaning];
      const futuroArray = [objectArray[2].spanishName, objectArray[2].meaning];

        divArray.push(
        <div key={key}>
          <div>Pasado: {pasadoArray[0]}, {pasadoArray[1]}</div>
          <div>Presente: {presenteArray[0]}, {presenteArray[1]}</div>
          <div>Futuro: {futuroArray[0]}, {futuroArray[1]}</div>
      </div>
    );
    }
  
  return (
    <div>
        {divArray}

    </div>
  )
}
