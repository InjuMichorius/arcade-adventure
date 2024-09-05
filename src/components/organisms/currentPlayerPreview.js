import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";

function CurrentPlayerPreview({ player1, player2, isPlayerOneTurn }) {
  return (
    <div className="current-player-preview">
      <div
        className={`current-player-wrapper ${isPlayerOneTurn ? "active" : ""}`}
      >
        <img src={player1.avatar} alt="avatar" width={100} />
        <p className="points-text">
          {player1.points}
          <FontAwesomeIcon icon={faWineBottle} className="icon" />
        </p>
        {player1.username}
      </div>
      <p>vs</p>
      <div
        className={`current-player-wrapper ${!isPlayerOneTurn ? "active" : ""}`}
      >
        <img src={player2.avatar} alt="avatar" width={100} />
        <p className="points-text">
          {player2.points}
          <FontAwesomeIcon icon={faWineBottle} className="icon" />
        </p>
        {player2.username}
      </div>
    </div>
  );
}

export default CurrentPlayerPreview;
