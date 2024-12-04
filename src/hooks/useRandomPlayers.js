import { useEffect } from 'react';

const useRandomPlayers = (numberOfPlayers) => {
  useEffect(() => {
    // Check if activePlayers already exist in localStorage
    const activePlayers = JSON.parse(localStorage.getItem('activePlayers'));
    if (activePlayers) {
      console.log("Active players found:", activePlayers);
      return; // If activePlayers exist, stop here
    }

    // Otherwise, get all players from localStorage
    const players = JSON.parse(localStorage.getItem('players')) || [];
    if (players.length < numberOfPlayers) {
      console.warn("Not enough players available to select.");
      return; // Exit if not enough players to select
    }

    // Randomly select players
    const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    const selectedPlayers = shuffledPlayers.slice(0, numberOfPlayers);

    // Save selected players to activePlayers in localStorage
    localStorage.setItem('activePlayers', JSON.stringify(selectedPlayers));
    console.log("Selected new active players:", selectedPlayers);
  }, [numberOfPlayers]);
};

export default useRandomPlayers;
