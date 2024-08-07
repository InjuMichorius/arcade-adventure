import React, { useEffect, useState } from "react";
import NavBar from "../organisms/navBar";
import TicTacToe from "../games/ticTacToe";
import Memory from "../games/memory";
import { useNavigate } from "react-router-dom";

const games = [
  { component: TicTacToe, name: "TicTacToe" },
  { component: Memory, name: "Memory" },
];

function Game() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    console.log(storedPlayers, storedPlayers == [])
    if(storedPlayers.length === 0) {
      navigate("/react-doodles");
    }
    setPlayers(storedPlayers);
  }, []);

  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const CurrentGameComponent = games[currentGameIndex].component;

  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const handleLeaveGameClick = () => {
    localStorage.removeItem("players");
    navigate("/react-doodles");
    window.location.reload();
  };

  return (
    <div className="game-container">
      <NavBar players={players} onLeaveGameClick={handleLeaveGameClick} />
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
