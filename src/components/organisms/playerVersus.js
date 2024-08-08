import React from "react";

function PlayerVersus({player1, player2}) {
  return (
    <div className="player-display">
      <p>
        {player1.username} {player1.points}
      </p>
      <p>vs</p>
      <p>
        {player2.username} {player2.points}
      </p>
    </div>
  );
}

export default PlayerVersus;
