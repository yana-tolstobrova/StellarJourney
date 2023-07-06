import React, { useState, useEffect } from 'react';
import './FavoritesCards.css';
import DeleteModal from './PopUpDelete';
import Cards from '../../assets/cards-saved.svg'
import axios from 'axios';


export default function FavoritesCards() {
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
  axios.get('http://localhost:3001/sakura-cards')
    .then(response => {
      const reversedData = response.data.reverse();
      setSavedData(reversedData);
    })
    .catch(error => {
      console.error('Error fetching data:', error.message);
    });
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

  axios.put(`http://localhost:3001/sakura-cards/${savedData[index].id}`, updatedData)
    .then(response => {
      const newData = [...savedData];
      newData[index] = response.data;
      setSavedData(newData);
    })
    .catch(error => {
      console.error('Error saving data:', error.message);
    });

  setEditedIndex(-1);
  setEditedTextareaValue('');
};


  const handleDelete = (index) => {
  const id = savedData[index].id;

  axios.delete(`http://localhost:3001/sakura-cards/${id}`)
    .then(() => {
      setSavedData(prevSavedData => {
        const newData = [...prevSavedData];
        newData.splice(index, 1);
        return newData;
      });
    })
    .catch(error => {
      console.error('Error deleting data:', error.message);
    });
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
