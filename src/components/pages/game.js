import React, { useEffect } from "react";
import NavBar from "../organisms/navBar";
import { useNavigate } from "react-router-dom";
import { useCurrentGame } from "../../hooks/useCurrentGame";
import { usePlayers } from "../../hooks/usePlayers";

function Game() {
  const navigate = useNavigate();
  const { players, player1, player2, setPlayers, setPlayer1, setPlayer2 } = usePlayers(navigate);

  const { CurrentGameComponent, handleNextGame } = useCurrentGame();

  // Function to get random players
  function getRandomPlayers(players, num = 2) {
    const shuffled = [...players].sort(() => 0.5 - Math.random()); // Create a new array to avoid mutating the original
    return shuffled.slice(0, num);
  }

  useEffect(() => {
    // Retrieve players from localStorage
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

    // Redirect to /arcade-adventure if no players found
    if (storedPlayers.length === 0) {
      navigate("/arcade-adventure");
      return;
    }

    // Set players state
    setPlayers(storedPlayers);

    // Check if 'currentplayers' exist in localStorage
    const currentPlayers = JSON.parse(localStorage.getItem("activePlayers"));

    if (currentPlayers && currentPlayers.length === 2) {
      // Use existing 'currentplayers' if available
      setPlayer1(currentPlayers[0]);
      setPlayer2(currentPlayers[1]);
    } else {
      // Generate new random players if 'currentplayers' does not exist
      const randomPlayers = getRandomPlayers(storedPlayers);

      // Destructure player1 and player2
      const [randomPlayer1, randomPlayer2] = randomPlayers;

      if (randomPlayer1 && randomPlayer2) {
        // Set player1 and player2 state
        setPlayer1(randomPlayer1);
        setPlayer2(randomPlayer2);

        // Set 'currentplayers' in localStorage
        localStorage.setItem("activePlayers", JSON.stringify(randomPlayers));
      }
    }
  }, [navigate, setPlayer1, setPlayer2, setPlayers]);

  // Get players from localStorage, update points for localStorage and react state based on game result
  const updateSips = (playerName, sipAmount) => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  
    // Find the player by name and update their sipAmount (or points)
    const updatedPlayers = storedPlayers.map(player => {
      if (player.username === playerName) {
        // Update the player's points (or whatever property you need to update)
        return { ...player, points: player.points + sipAmount };
      }
      return player;
    });
  
    // Update localStorage with the new player data
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };  

  return (
    <div className="game-container">
      <NavBar players={players} />
      <main>
        {/* Render the current game component if players are set */}
        {player1 && player2 && (
          <CurrentGameComponent
            onNextGame={handleNextGame}
            updateSips={updateSips}
          />
        )}
      </main>
    </div>
  );
}

export default Game;
