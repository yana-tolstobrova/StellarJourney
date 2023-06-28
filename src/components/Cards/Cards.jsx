import React, { useState, useEffect } from 'react';
import { fetchFilteredCards } from './ApiGetArray';
import './Cards.css';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState([]);
  const [shouldShuffle, setShouldShuffle] = useState(true);




  useEffect(() => {
    const fetchData = async () => {
      const filteredCards = await fetchFilteredCards();
      setCards(filteredCards);
      setShouldShuffle(true); // Enable shuffling when the page is refreshed

    };
      
    fetchData();
  }, []);

    useEffect(() => {
    if (shouldShuffle) {
      const mixedCards = [...cards];
      for (let i = mixedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mixedCards[i], mixedCards[j]] = [mixedCards[j], mixedCards[i]];
      }
      setCards(mixedCards);
      setShouldShuffle(false); // Disable shuffling after the cards are shuffled once
    }
  }, [shouldShuffle, cards]);


  const handleCardClick = (cardId) => {
    if (selectedCards.length < 3) {
      const selectedCard = cards.find(card => card.id === cardId);
      setSelectedCards(prevSelectedCards => [...prevSelectedCards, selectedCard]);
      setHiddenCards(prevHiddenCards => [...prevHiddenCards, cardId]);

      console.log(selectedCard.spanishName)
      
    }
  };

const renderSelectedCards = () => {
    return selectedCards.map((card) => (
      <div key={card.id} className='selectedCard'>
        <img src={card.clowCard} alt={card.name} className="openedCard" />
        <span>{card.spanishName}</span>
        <span>{card.meaning}</span>
      </div>
    ));
  };


  return (
    <div>
      <div className='selectedCards'>{renderSelectedCards()}</div>
      <div className="cards">
      {cards.map((card) => (
        <div key={card.id} onClick={() => handleCardClick(card.id)}
          className={hiddenCards.includes(card.id) ? "card hidden" : "card"}
>
              <img src={card.cardsReverse.clowReverse} alt={card.name} className="card" />
        </div>
      ))}
    </div>
    </div>
    
  );
};

export default CardList;
