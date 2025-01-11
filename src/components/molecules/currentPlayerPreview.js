import React from "react";
import AvatarPreview from "../atoms/avatarPreview";

function CurrentPlayerPreview({ currentPlayers }) {
  return (
    <div className="current-player-preview">
      {currentPlayers && currentPlayers.map((currentPlayer, index) => {

        //TODO: Implement the isActive logic for styling
        const isActive = true

        return (
          <React.Fragment key={currentPlayer.username}>
            <div
              className={`current-player-wrapper ${isActive ? "active" : ""}`}
            >
              <AvatarPreview width={100} image={currentPlayer.avatar} points={currentPlayer.points} />
              {currentPlayer.username}
            </div>
            {index < currentPlayers.length - 1 && <p className="versus">vs</p>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default CurrentPlayerPreview;
