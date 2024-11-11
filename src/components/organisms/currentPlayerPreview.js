import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";

function CurrentPlayerPreview({ isPlayerOneTurn }) {
  // Haal de volledige lijst van spelers en de actieve spelers op uit localStorage
  const players = JSON.parse(localStorage.getItem("players"));
  const activePlayers = JSON.parse(localStorage.getItem("activePlayers"));

  // Log om te controleren wat er in activePlayers en players zit
  console.log("players:", players);
  console.log("activePlayers:", activePlayers);

  // Haal de spelers uit activePlayers op basis van hun index (zonder `find`)
  const player1 = activePlayers[0]; // activePlayers[0] is het eerste object
  const player2 = activePlayers[1]; // activePlayers[1] is het tweede object

  // Log de actieve spelers om te debuggen
  console.log("player1:", player1);
  console.log("player2:", player2);

  // Controleer of de actieve spelers daadwerkelijk aanwezig zijn
  if (!player1 || !player2) {
    return <p>Er is een probleem met het ophalen van de actieve spelers. Controleer of de juiste spelers in de lijst staan.</p>;
  }

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
