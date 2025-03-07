import React, { createContext, useState, useEffect } from "react";

// Create context
export const PlayerDataContext = createContext();

export const PlayerDataProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(storedPlayers); // Set players from localStorage
  }, []);

  const updateSips = (playerNames, sipAmount) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) =>
        (Array.isArray(playerNames) ? playerNames : [playerNames]).includes(
          player.username
        )
          ? { ...player, points: (player.points || 0) + sipAmount }
          : player
      );

      localStorage.setItem("players", JSON.stringify(updatedPlayers)); // Persist in localStorage
      return updatedPlayers;
    });
  };

  return (
    <PlayerDataContext.Provider value={{ players, setPlayers, updateSips }}>
      {children}
    </PlayerDataContext.Provider>
  );
};
