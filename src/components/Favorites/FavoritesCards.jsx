import React, { useState } from 'react';
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

  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedTextareaValue, setEditedTextareaValue] = useState('');

  const handleEdit = (index) => {
    setEditedIndex(index);
    setEditedTextareaValue(savedData[index].textareaValue);
  };

  const handleSaveEdit = (index) => {
    const updatedData = {
      ...savedData[index],
      textareaValue: editedTextareaValue,
    };
    savedData[index] = updatedData;

    const key = localStorage.key(index);
    localStorage.setItem(key, JSON.stringify(updatedData));

    setEditedIndex(-1);
    setEditedTextareaValue('');
  };

  const divArray = savedData.map((data, index) => (
    <div key={index} className='savedBox'>
      <div className='date'>{data.date}</div>
      <div className='line'>
        <strong>Pasado:</strong> {data.selectedCards[0].meaning}
      </div>
      <div className='line'>
        <strong>Presente:</strong> {data.selectedCards[1].meaning}
      </div>
      <div>
        <strong>Futuro:</strong> {data.selectedCards[2].meaning}
      </div>
      {editedIndex !== index && <div>{data.textareaValue}</div>}
      {editedIndex === index && (
        <textarea
          value={editedTextareaValue}
          onChange={(e) => setEditedTextareaValue(e.target.value)}
        ></textarea>
      )}
      {editedIndex !== index && (
        <button onClick={() => handleEdit(index)}>Editar comentario</button>
      )}
      {editedIndex === index && (
        <button onClick={() => handleSaveEdit(index)}>Guardar</button>
      )}
    </div>
  ));

  return <div>{divArray.reverse()}</div>;
}
