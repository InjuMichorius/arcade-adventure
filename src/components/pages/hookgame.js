import React from "react";
import NavBar from "../organisms/navBar";
import { useNavigate } from "react-router-dom";
import { usePlayers } from "../../hooks/usePlayers";
import { useCurrentGame } from "../../hooks/useCurrentGame";
import { useUpdatePlayerPoints } from "../../hooks/useUpdatePlayerPoints";

function Game() {
  const navigate = useNavigate();

  const {
    players,
    player1,
    player2,
    setPlayers,
    setPlayer1,
    setPlayer2,
  } = usePlayers(navigate);

  const { CurrentGameComponent, handleNextGame } = useCurrentGame();

  const updateLosingPlayerPoints = useUpdatePlayerPoints(
    players,
    setPlayers,
    player1,
    setPlayer1,
    player2,
    setPlayer2
  );

  const handleLeaveGameClick = () => {
    localStorage.removeItem("players");
    localStorage.removeItem("currentplayers");
    navigate("/arcade-adventure");
    window.location.reload();
  };

  return (
    <div className="game-container">
      <NavBar players={players} onLeaveGameClick={handleLeaveGameClick} />
      <main>
        {player1 && player2 && (
          <CurrentGameComponent
            player1={player1}
            player2={player2}
            onNextGame={handleNextGame}
            onLose={updateLosingPlayerPoints}
          />
        )}
      </main>
    </div>
  );
}

export default Game;
