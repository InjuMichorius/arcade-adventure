import React, { useState } from 'react';
import Button from '../molecules/button';

const choices = ['rock', 'paper', 'scissors'];

const getWinner = (choice1, choice2) => {
  if (choice1 === choice2) return 'Draw';
  if (
    (choice1 === 'rock' && choice2 === 'scissors') ||
    (choice1 === 'scissors' && choice2 === 'paper') ||
    (choice1 === 'paper' && choice2 === 'rock')
  ) {
    return 1; // Player 1 wins
  } else {
    return 2; // Player 2 wins
  }
};

function RockPaperScissors({ player1, player2 }) {
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [winner, setWinner] = useState(null);

  const handleChoice = (player, choice) => {
    if (winner) return;
    if (player === 1) {
      setPlayer1Choice(choice);
    } else {
      setPlayer2Choice(choice);
    }
  };

  const playGame = () => {
    if (player1Choice && player2Choice) {
      const gameWinner = getWinner(player1Choice, player2Choice);
      if (gameWinner === 'Draw') {
        setWinner('Draw');
      } else {
        setWinner(gameWinner === 1 ? player1.name : player2.name);
      }
    }
  };

  const resetGame = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setWinner(null);
  };

  return (
    <div className='rps-container'>
      <h1>Rock Paper Scissors</h1>
      <div className='player-section'>
        <h2>{player1.name}</h2>
        <div className='choices'>
          {choices.map((choice) => (
            <Button
              key={choice}
              variant="primary"
              onClick={() => handleChoice(1, choice)}
              text={choice.charAt(0).toUpperCase() + choice.slice(1)}
            />
          ))}
        </div>
        {player1Choice && <p>Choice: {player1Choice}</p>}
      </div>
      <div className='player-section'>
        <h2>{player2.name}</h2>
        <div className='choices'>
          {choices.map((choice) => (
            <Button
              key={choice}
              variant="primary"
              onClick={() => handleChoice(2, choice)}
              text={choice.charAt(0).toUpperCase() + choice.slice(1)}
            />
          ))}
        </div>
        {player2Choice && <p>Choice: {player2Choice}</p>}
      </div>
      <Button variant="primary" onClick={playGame} text="Play Game" />
      {winner && (
        <div>
          <p>{winner === 'Draw' ? 'The game is a draw!' : `Winner: ${winner}`}</p>
          <Button variant="primary" onClick={resetGame} text="Play again" />
        </div>
      )}
    </div>
  );
}

export default RockPaperScissors;
