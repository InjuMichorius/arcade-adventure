import React, { useState, useEffect } from 'react';
import Button from '../molecules/button';

const cards = [
  '🍎', '🍎', '🍌',
  '🍇', '', '🍇',
  '🍓', '🍓', '🍌'
];

const shuffleArray = (array) => {
  // Ensure the empty card stays at index 4 after shuffling
  const emptyCard = array[4];
  const shuffledArray = array.filter((_, index) => index !== 4); // Remove the empty card temporarily
  shuffledArray.sort(() => Math.random() - 0.5); // Shuffle the remaining cards
  shuffledArray.splice(4, 0, emptyCard); // Insert the empty card back at index 4
  return shuffledArray;
};

function Memory({ player1, player2, onNextGame }) {
  const [shuffledCards, setShuffledCards] = useState(shuffleArray([...cards])); // Including empty card
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (matchedCards.length === cards.filter(card => card !== '').length) {
      setWinner(player1.score > player2.score ? player1.name : player2.name);
    }
  }, [matchedCards, player1, player2]);

  const handleCardClick = (index) => {
    if (index === 4 || flippedCards.length >= 2 || flippedCards.includes(index) || matchedCards.includes(shuffledCards[index])) {
      return; // Ignore clicks on the hole, already flipped cards, or matched cards
    }
  
    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (shuffledCards[firstIndex] === shuffledCards[secondIndex]) {
        setMatchedCards([...matchedCards, shuffledCards[firstIndex], shuffledCards[secondIndex]]);
        setFlippedCards([]);
        setCurrentPlayer(current => ({
          ...current,
          score: current.score + 1
        }));
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
        setCurrentPlayer(current => current === player1 ? player2 : player1);
      }
    }
  }, [flippedCards, shuffledCards, matchedCards, player1, player2]);

  const resetGame = () => {
    setShuffledCards(shuffleArray([...cards]));
    setFlippedCards([]);
    setMatchedCards([]);
    setWinner(null);
    setCurrentPlayer(player1); // Reset to player1's turn
    player1.score = 0; // Reset player scores
    player2.score = 0;
  };

  console.log(player1, player2);

  return (
    <div className='memory-game-container'>
      <h1>Memory Game</h1>
      <p>player1 score: {player1.score}</p>
      <p>player2 score: {player2.score}</p>
      <p>Current Player: {currentPlayer.name}</p>
      <div className='board'>
        {shuffledCards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedCards.includes(index) || matchedCards.includes(card) ? 'flipped' : ''} ${index === 4 ? 'hole' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {flippedCards.includes(index) || matchedCards.includes(card) ? card : '❓'}
          </div>
        ))}
      </div>
      {winner || matchedCards.length === cards.filter(card => card !== '').length ? (
        <div>
          {winner && <p>Winner: {winner}</p>}
          <Button variant="primary" onClick={resetGame} text="Play again" />
          <Button variant="secondary" onClick={onNextGame} text="Next Game" />
        </div>
      ) : null}
    </div>
  );
}

export default Memory;
