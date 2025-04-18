import React, { useContext } from "react";
import NavBar from "../organisms/navBar";
import { PlayerDataContext } from "../../providers/playerDataProvider";
import { useCurrentGame } from "../../hooks/useCurrentGame";

function Game() {
  const { players } = useContext(PlayerDataContext);

  const { CurrentGameComponent, handleNextGame } = useCurrentGame();

  return (
    <div className="game-container">
      <NavBar players={players} />
      <main>
        <CurrentGameComponent onNextGame={handleNextGame} players={players} />
      </main>
    </div>
  );
}

export default Game;
