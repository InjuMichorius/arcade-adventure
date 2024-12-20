import React from "react";
import AvatarPreview from "../atoms/avatarPreview";

function CurrentPlayerPreview({ isPlayerOneTurn }) {
  // Get the full list of players from localStorage
  const players = JSON.parse(localStorage.getItem("players")) || [];

  // Filter players to get only those marked as active
  const activePlayers = players.filter(player => player.activePlayer);

  return (
    <div className="current-player-preview">
      {activePlayers.map((player, index) => {

        //TODO: Implement the isActive logic for styling
        const isActive = true

        return (
          <React.Fragment key={player.username}>
            <div
              className={`current-player-wrapper ${isActive ? "active" : ""}`}
            >
              <AvatarPreview width={100} image={player.avatar} points={player.points} />
              {player.username}
            </div>
            {index < activePlayers.length - 1 && <p className="versus">vs</p>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default CurrentPlayerPreview;
