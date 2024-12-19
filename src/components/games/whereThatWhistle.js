import React, { useEffect, useState } from "react";
import Button from "../atoms/button";
import Modal from "../atoms/modal";
import CurrentPlayerPreview from "../molecules/currentPlayerPreview";
import AvatarPreview from "../atoms/avatarPreview";
import {
  faWhiskeyGlass,
  faRotateRight,
  faCircleRight,
} from "@fortawesome/free-solid-svg-icons";

function WhereThatWhistle({ onNextGame, updateSips }) {


  return (
    <div className="tic-tac-toe-container">
      <h1>Where that whistle</h1>
      <p>Hides the phone, other pplayers close their eyes</p>

      {true && (
        <>
          <div className="button-wrapper">
            <Button
              icon={faRotateRight}
              variant="secondary"
              text="Play again"
            />
            <Button
              icon={faCircleRight}
              variant="pushable red"
              onClick={onNextGame}
              text="Next Game"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default WhereThatWhistle;
