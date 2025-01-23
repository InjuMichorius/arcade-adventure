import React from "react";
import Button from "../atoms/button";
import { faRotateRight, faForward } from "@fortawesome/free-solid-svg-icons";
import AvatarPreview from "../atoms/avatarPreview";

function DrinkUp({ drinkMessage, playersToDrink, onPlayAgain, onNextGame }) {
  return (
    <div className="drink-up">
      <h2>Drink up</h2>
      <div className="avatars-container">
        {playersToDrink.map((player, index) => (
          <div key={index} className="player-avatar">
            <AvatarPreview
              width={100}
              image={player.avatar}
              points={player.points}
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
          onClick={onPlayAgain}
        />
        <Button
          icon={faForward}
          variant="pushable red"
          text="Next game"
          onClick={onNextGame}
        />
      </div>
    </div>
  );
}

export default DrinkUp;
