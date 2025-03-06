import { useEffect } from 'react';

const useRandomPlayers = (numberOfPlayers) => {
  useEffect(() => {
    // Retrieve players from localStorage
    const players = JSON.parse(localStorage.getItem('players')) || [];

    if (players.length < numberOfPlayers) {
      console.warn("Not enough players available to select.");
      return; // Exit if not enough players to select
    }

    // Check if there are already active players
    const hasActivePlayers = players.some(player => player.activePlayer);
    if (hasActivePlayers) {
      console.log("Active players already set:", players.filter(player => player.activePlayer));
      return; // Exit if active players are already set
    }

    // Randomly select players and mark them as active
    const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    const selectedPlayers = shuffledPlayers.slice(0, numberOfPlayers);

    // Update players array to set activePlayer: true for selected players
    const updatedPlayers = players.map(player => ({
      ...player,
      activePlayer: selectedPlayers.some(selected => selected.id === player.id),
    }));

    // Save the updated players array back to localStorage
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    console.log("Updated players with activePlayer:", updatedPlayers);
  }, [numberOfPlayers]);
};

export default useRandomPlayers;
