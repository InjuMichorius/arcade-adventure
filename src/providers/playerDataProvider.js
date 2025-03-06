import React, { createContext, useState, useEffect } from "react";

// Create context
export const PlayerDataContext = createContext();

export const PlayerDataProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(storedPlayers); // Set players from localStorage
  }, []);

  const updateSips = (playerName, sipAmount) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) =>
        player.username === playerName
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
