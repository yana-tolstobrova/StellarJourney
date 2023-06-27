import React, { useState, useEffect } from 'react';
import { fetchFilteredCards } from './ApiGetArray';
import './Cards.css';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const filteredCards = await fetchFilteredCards();
      setCards(filteredCards);
    };
      
    fetchData();
  }, []);

  const handleCardClick = (cardId) => {
    if (selectedCards.length < 3) {
      const selectedCard = cards.find(card => card.id === cardId);
      setSelectedCards(prevSelectedCards => [...prevSelectedCards, selectedCard]);
      console.log(selectedCard.spanishName)
      
    }
  };

const mixedCards = [...cards];
  for (let i = mixedCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedCards[i], mixedCards[j]] = [mixedCards[j], mixedCards[i]];
  }


  return (
    <div className="cards">
      {mixedCards.map((card) => (
        <div key={card.id} onClick={() => handleCardClick(card.id)}>
              <img src={card.cardsReverse.clowReverse} alt={card.name} className="card" />
        </div>
      ))}
    </div>
  );
};

export default CardList;
