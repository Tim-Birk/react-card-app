import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './CardGame.css';
import { getRandBetweenNegPos } from './helpers';
import axios from 'axios';

const CardGame = () => {
  const [deck, setDeck] = useState('');
  const [cards, setCards] = useState([]);
  const [activeDraw, setActiveDraw] = useState(false);
  const btnRef = useRef();

  // on first load get data for a new deck
  useEffect(() => {
    const getDeck = async () => {
      const response = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      );

      setDeck(response.data);
    };
    getDeck();
  }, []);

  useEffect(() => {
    // draw a new card from the deck
    const drawCard = async () => {
      if (!activeDraw) {
        return;
      }
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );

      // update the cards remaining in the deck state
      setDeck((d) => ({ ...d, remaining: response.data.remaining }));

      // get new card from api response
      const newCard = response.data.cards[0];

      // if no more cards alert user and disable button
      if (!newCard) {
        btnRef.current.disabled = true;
        setActiveDraw(false);
        alert('Error: no cards remaining!');
        return;
      }

      // add new card to cards state with angle to style css with (and keep track for across renders)
      setCards((oldCards) => [
        ...oldCards,
        { ...newCard, angle: getRandBetweenNegPos() },
      ]);
    };
    const intervalId = setInterval(() => {
      drawCard();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeDraw, deck.deck_id]);

  const handleClick = () => {
    setActiveDraw((currentState) => !currentState);
  };

  return (
    <>
      <button onClick={handleClick} ref={btnRef}>
        {`${activeDraw ? 'Stop ' : 'Start'} Drawing`}
      </button>
      <div className='card-pile'>
        {deck &&
          cards.map((card) => (
            <Card
              key={`${card.value}-${card.suit}`}
              image={card.image}
              value={card.value}
              suit={card.suit}
              angle={card.angle}
            />
          ))}
      </div>
    </>
  );
};

export default CardGame;
