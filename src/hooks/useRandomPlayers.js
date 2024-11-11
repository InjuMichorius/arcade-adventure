import { useEffect } from 'react';

const useRandomPlayers = (numberOfPlayers) => {
  useEffect(() => {
    const players = JSON.parse(localStorage.getItem('players'));

    const activePlayers = localStorage.getItem('activePlayers');
    if (activePlayers) {
      return;
    }

    // Selecteer random spelers uit de players array
    const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    const selectedPlayers = shuffledPlayers.slice(0, numberOfPlayers);

    // Sla de geselecteerde spelers op in localStorage
    localStorage.setItem('activePlayers', JSON.stringify(selectedPlayers));
  }, [numberOfPlayers]);
};

export default useRandomPlayers;
