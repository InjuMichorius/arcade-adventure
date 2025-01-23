import React from "react";
import Button from "../atoms/button";
import { faGamepad, faForward } from "@fortawesome/free-solid-svg-icons";

function DrinkUp({ player1, isFound, onPlayAgain, onNextGame }) {
  return (
    <div className="drink-up">
      <h1>Drink up!</h1>
      <p className="regular-text">
        {isFound
          ? `${player1?.name || "The player hiding the phone"} needs to drink!`
          : "All searchers need to drink!"}
      </p>
      <div className="button-wrapper">
        <Button
          icon={faGamepad}
          variant="pushable red"
          text="Play again"
          onClick={onPlayAgain}
        />
        <Button
          icon={faForward}
          variant="secondary"
          text="Next game"
          onClick={onNextGame}
        />
      </div>
    </div>
  );
}

export default DrinkUp;
