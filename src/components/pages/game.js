import React, { useState } from "react";
import NavBar from "../organisms/navBar";
import TicTacToe from "../games/ticTacToe";
import Memory from "../games/memory";

function getRandomPlayers(players, num = 2) {
  const shuffled = players.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const games = [
  { component: TicTacToe, name: "TicTacToe" },
  { component: Memory, name: "Memory" },
];

function Game() {
  const players = JSON.parse(localStorage.getItem('players'));
  console.log(players);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const CurrentGameComponent = games[currentGameIndex].component;

  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  return (
    <div className="game-container">
      <NavBar players={players} />
      <main>
        {/* <CurrentGameComponent
          player1={player1}
          player2={player2}
          onNextGame={handleNextGame}
        /> */}
      </main>
    </div>
  );
}

export default Game;
