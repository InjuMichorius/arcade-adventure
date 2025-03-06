import React, { useContext } from "react";
import { PlayerDataContext } from "../../providers/playerDataProvider"; 

function EmptyGame() {
  const { players, updateSips, loading } = useContext(PlayerDataContext);

  // Check if players are loading or empty
  if (loading || players.length === 0) {
    return <div>Loading players...</div>; // Show loading until players are available
  }

  return (
    <ul>
      {players.map((player, index) => (
        <li key={index}>
          {player.username} {player.points}
          <button onClick={() => updateSips(player.username, 1)}>Add 1 point</button>
        </li>
      ))}
    </ul>
  );
}

export default EmptyGame;
