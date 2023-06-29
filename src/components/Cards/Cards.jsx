import React, { useState, useEffect } from 'react';
import { fetchFilteredCards } from './ApiGetArray';
import './Cards.css';


const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState([]);
  const [shouldShuffle, setShouldShuffle] = useState(true);
  const [isButtonsBoxDisplayed, setIsButtonsBoxDisplayed] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const filteredCards = await fetchFilteredCards();
      setCards(filteredCards);
      setShouldShuffle(true); 

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
      setShouldShuffle(false); 
    }
  }, [shouldShuffle, cards]);


  const handleCardClick = (cardId) => {
  if (selectedCards.length < 3) {
    const selectedCard = cards.find((card) => card.id === cardId);
    if (hiddenCards.includes(cardId)) {
      return; 
    }

    setSelectedCards((prevSelectedCards) => {
      const updatedSelectedCards = [...prevSelectedCards, selectedCard];
      setHiddenCards((prevHiddenCards) => [...prevHiddenCards, cardId]);
      setIsButtonsBoxDisplayed(updatedSelectedCards.length === 3);
            
      sessionStorage.setItem('selectedCards', JSON.stringify(updatedSelectedCards));


      return updatedSelectedCards;
    });

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

const handlePageRefresh = () => {
  window.location.reload();
  sessionStorage.clear();
};

window.onload = () => {
  sessionStorage.clear();
};
  
  function saveData() {
  const selectedCardsKey = `selectedCards_${localStorage.length}`;
  const value = sessionStorage.getItem('selectedCards');
  
    setIsButtonDisabled(true);

  localStorage.setItem(selectedCardsKey, value);
  sessionStorage.removeItem('selectedCards');
}
  
  return (
    <div>
      <div className='selectedCards'>{renderSelectedCards()}</div>
      <div className={isButtonsBoxDisplayed ? 'buttonsBox display' : 'buttonsBox'}>
        <button className='buttonSave' onClick={saveData} disabled={isButtonDisabled}>Guardar</button>
        <button className='buttonRestart' onClick={handlePageRefresh}>Reiniciar</button>
      </div>
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
