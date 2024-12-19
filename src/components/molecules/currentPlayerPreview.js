import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";
import AvatarPreview from "../atoms/avatarPreview";

function CurrentPlayerPreview({ isPlayerOneTurn }) {
  // Get the full list of players from localStorage
  const players = JSON.parse(localStorage.getItem("players")) || [];

  // Filter players to get only those marked as active
  const activePlayers = players.filter(player => player.activePlayer);

  // Check if there are exactly two active players
  if (activePlayers.length !== 2) {
    return <p>Er is een probleem met het ophalen van de actieve spelers. Controleer of de juiste spelers in de lijst staan.</p>;
  }

  // Destructure the two active players
  const [player1, player2] = activePlayers;

  return (
    <div className="current-player-preview">
      <div
        className={`current-player-wrapper ${isPlayerOneTurn ? "active" : ""}`}
      >
        <AvatarPreview width={100} image={player1.avatar} points={player1.points} />
        {player1.username}
      </div>
      <p>vs</p>
      <div
        className={`current-player-wrapper ${!isPlayerOneTurn ? "active" : ""}`}
      >
        <AvatarPreview width={100} image={player2.avatar} points={player2.points} />
        {player2.username}
      </div>
    </div>
  );
}

export default CurrentPlayerPreview;
