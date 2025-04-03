import React, { useState } from "react";
import DrinkUp from "../atoms/drinkUp";

function ChoosePlayerToDrink({
  players,
  drinkAmount,
  onPlayAgain,
  onNextGame,
}) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isDrinkUpVisible, setIsDrinkUpVisible] = useState(false); // Track visibility of DrinkUp

  const handlePlayerToggle = (playerId) => {
    setSelectedPlayers((prevSelectedPlayers) => {
      if (prevSelectedPlayers.includes(playerId)) {
        return prevSelectedPlayers.filter((id) => id !== playerId);
      } else {
        return [...prevSelectedPlayers, playerId];
      }
    });
  };

  const handleDrinkClick = () => {
    setIsDrinkUpVisible(true); // Show the DrinkUp component
  };
  const drinkMessage = selectedPlayers.length > 1
  ? `${players
      .filter(player => selectedPlayers.includes(player.id))
      .map((player, index, arr) =>
        index === arr.length - 1
          ? ` and ${player.username}` // Ensure space before 'and'
          : index === arr.length - 2
          ? `${player.username}`
          : `${player.username}, `
      )
      .join('')} drink ${drinkAmount} sips`
  : `${players.filter(player => selectedPlayers.includes(player.id))[0]?.username} drinks ${drinkAmount} sips`;




  return (
    <div>
      {!isDrinkUpVisible ? (
        <div className="choose-player-to-drink">
          <h2>Word guessed! Select players</h2>
          <div className="player-selection">
            {players.map((player) => (
              <div key={player.id} className="player">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPlayers.includes(player.id)}
                    onChange={() => handlePlayerToggle(player.id)}
                  />
                  {player.username}
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleDrinkClick}>Drink!</button>
        </div>
      ) : (
        <DrinkUp
          drinkMessage={drinkMessage}
          playersToDrink={players.filter((player) =>
            selectedPlayers.includes(player.id)
          )}
          onPlayAgain={onPlayAgain}
          onNextGame={onNextGame}
          drinkAmount={drinkAmount}
        />
      )}
    </div>
  );
}

export default ChoosePlayerToDrink;
