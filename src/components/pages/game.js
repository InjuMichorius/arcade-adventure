import React from 'react';
import NavBar from '../organisms/navBar';
import TicTacToe from '../games/ticTacToe';
// import Fingering from '../games/fingering';
// import RockPaperScissors from '../games/rockPaperScissors';
import Memory from '../games/memory';

function getRandomPlayers(players, num = 2) {
  const shuffled = players.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const dummyPlayers = [
  { id: 0, name: 'Inju 1', points: 0 },
  { id: 1, name: 'Inju 2', points: 0 },
];

function Game({ players }) {
  const randomPlayers = getRandomPlayers(dummyPlayers);
  const [player1, player2] = randomPlayers;

  return (
    <div className='game-container'>
      <NavBar />
      <main>
      <TicTacToe player1={player1} player2={player2} />
      {/* <RockPaperScissors player1={player1} player2={player2} /> */}
      <Memory player1={player1} player2={player2} />
      {/* <Fingering /> */}
      </main>
    </div>
  );
}

export default Game;
