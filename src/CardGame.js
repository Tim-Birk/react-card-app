import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const CardGame = () => {
  const [deckId, setDeckId] = useState('');
  const [card, setCard] = useState({});

  const getDeckId = async () => {
    const response = await axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );

    setDeckId(response.data.deck_id);
  };

  const drawCard = async () => {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const newCard = response.data.cards[0];
    setCard(newCard);
  };

  useEffect(() => {
    getDeckId();
  }, []);

  const handleClick = () => {
    drawCard();
  };

  return (
    <>
      <button onClick={handleClick}>GIMME A CARD!</button>
    </>
  );
};

export default CardGame;
