import React, { useState, useEffect } from 'react';
import './FavoritesCards.css';
import DeleteModal from './PopUpDelete';
import Cards from '../../assets/cards-saved.svg'


export default function FavoritesCards() {
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
  const savedData = [];
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('Saved_')) {
      keys.push(key);
    }
  }
  keys.sort().reverse(); // Sort the keys in descending order

  for (const key of keys) {
    const data = localStorage.getItem(key);
    savedData.push(JSON.parse(data));
  }
  setSavedData(savedData);
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

  const handleDelete = (index) => {
    const key = localStorage.key(index);
    localStorage.removeItem(key);
    setSavedData((prevSavedData) => {
      const newData = [...prevSavedData];
      newData.splice(index, 1);
      return newData;
    });
    // Perform any additional delete logic or state updates
  };

  const divArray = savedData.map((data, index) => (
    <div key={index} className='savedBox'>
      <div className='date'>{data.date}<DeleteModal onDelete={() => handleDelete(index)} />
</div>
      <div className='line'>
        <strong>Pasado:</strong> {data.selectedCards[0].meaning}
      </div>
      <div className='line'>
        <strong>Presente:</strong> {data.selectedCards[1].meaning}
      </div>
      <div className='line'>
        <strong>Futuro:</strong> {data.selectedCards[2].meaning}
      </div>
      <div>
        <strong>Comentario:</strong>
        {editedIndex !== index && <div>{data.textareaValue}</div>}
      {editedIndex === index && (
        <textarea
          value={editedTextareaValue}
          className='textArea'
          onChange={(e) => setEditedTextareaValue(e.target.value)}
        ></textarea>
      )}
      {editedIndex !== index && (
        <button onClick={() => handleEdit(index)} className='buttonEdit'>Editar</button>
      )}
      {editedIndex === index && (
        <button onClick={() => handleSaveEdit(index)} className='buttonEdit'>Guardar</button>
      )}
      </div>
      
    </div>
  ));

  return <div>
    <div className='image'><img src={Cards} alt='cards'></img></div>
    {divArray}</div>;
}
