import React, { useContext } from "react";
import Button from "../atoms/button";
import { faRotateRight, faForward } from "@fortawesome/free-solid-svg-icons";
import AvatarPreview from "../atoms/avatarPreview";
import { PlayerDataContext } from "../../providers/playerDataProvider";

function DrinkUp({ drinkMessage, playersToDrink, onPlayAgain, onNextGame, drinkAmount }) {
  const { updatePlayer } = useContext(PlayerDataContext);

  // Function to add 10 points to players who must drink
  const handleDrink = () => {
    playersToDrink.forEach((player) => {
      updatePlayer(player.id, { points: player.points + 1 });
    });
  };

  return (
    <div className="drink-up">
      <h2>Drink up</h2>
      <div className="avatars-container">
        {playersToDrink.map((player, index) => (
          <div key={index} className="player-avatar">
            <AvatarPreview
              width={100}
              image={player.avatar}
              points={`+ ${drinkAmount}`}
            />
            <p>{player.username}</p>
          </div>
        ))}
      </div>
      <p className="regular-text">{drinkMessage}</p>
      <div className="button-wrapper">
        <Button
          icon={faRotateRight}
          variant="secondary"
          text="Play again"
          onClick={() => {
            handleDrink();
            onPlayAgain();
          }}
        />
        <Button
          icon={faForward}
          variant="pushable red"
          text="Next game"
          onClick={() => {
            handleDrink();
            onNextGame();
          }}
        />
      </div>
    </div>
  );
}

export default DrinkUp;
