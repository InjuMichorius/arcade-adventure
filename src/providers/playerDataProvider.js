import React, { createContext, useState, useEffect } from "react";

// Create context
export const PlayerDataContext = createContext();

export const PlayerDataProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState([]);

  // Load initial data from localStorage once on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("players")) || [];
    console.log("Loaded from localStorage:", storedData);
    setPlayerData(storedData);
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Update localStorage whenever playerData changes
  useEffect(() => {
    if (playerData.length > 0) {
      localStorage.setItem("players", JSON.stringify(playerData));
      console.log("Updated localStorage with playerData:", playerData);
    }
  }, [playerData]); // This will trigger when playerData changes

  // Update points, active player, etc.
  const updatePlayer = (id, updates) => {
    setPlayerData((prevData) => {
      const updatedData = prevData.map((player) =>
        player.id === id ? { ...player, ...updates } : player
      );
      
      // Only set new state if there is a change
      if (JSON.stringify(updatedData) !== JSON.stringify(prevData)) {
        return updatedData;
      }
      return prevData; // Avoid unnecessary state update
    });
  };

  return (
    <PlayerDataContext.Provider value={{ playerData, updatePlayer }}>
      {children}
    </PlayerDataContext.Provider>
  );
};
