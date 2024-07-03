import React from 'react';
import NavBar from '../organisms/navBar';
import TicTacToe from '../games/ticTacToe';

function getRandomPlayers(players, num = 2) {
  const shuffled = players.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const dummyPlayers = [
  { id: 0, name: 'Inju', component: null },
  { id: 1, name: 'Casper', component: null },
  // Add more players if needed
];

function Game({ players }) {
  const randomPlayers = getRandomPlayers(players);
  const [player1, player2] = randomPlayers;

  return (
    <div className='game-container'>
      <NavBar />
      <main>
      <TicTacToe player1={player1} player2={player2} />
      </main>
    </div>
  );
}

export default Game;
