import { useEffect, useState } from "react";

export function usePlayers(navigate) {
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  // Function to get random players
  function getRandomPlayers(players, num = 2) {
    const shuffled = [...players].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

    if (storedPlayers.length === 0) {
      navigate("/arcade-adventure");
      return;
    }

    setPlayers(storedPlayers);

    const currentPlayers = JSON.parse(localStorage.getItem("currentplayers"));
    if (currentPlayers && currentPlayers.length === 2) {
      setPlayer1(currentPlayers[0]);
      setPlayer2(currentPlayers[1]);
    } else {
      const [randomPlayer1, randomPlayer2] = getRandomPlayers(storedPlayers);
      if (randomPlayer1 && randomPlayer2) {
        setPlayer1(randomPlayer1);
        setPlayer2(randomPlayer2);
        localStorage.setItem(
          "currentplayers",
          JSON.stringify([randomPlayer1, randomPlayer2])
        );
      }
    }
  }, [navigate]);

  return { players, player1, player2, setPlayers, setPlayer1, setPlayer2 };
}
