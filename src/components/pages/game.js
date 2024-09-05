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
    const currentPlayers = JSON.parse(localStorage.getItem("currentplayers"));

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
        localStorage.setItem("currentplayers", JSON.stringify(randomPlayers));
      }
    }
  }, [navigate, setPlayer1, setPlayer2, setPlayers]);

  // Update the player's points when a game is lost
  const updateLosingPlayerPoints = (loserUsername) => {
    // Create a new array to avoid mutating the original
    const updatedPlayers = players.map((player) => {
      if (player.username === loserUsername) {
        // Increase points by 5
        return { ...player, points: player.points + 5 };
      }
      return player;
    });

    // Update the players state
    setPlayers(updatedPlayers);

    // Update the localStorage
    localStorage.setItem("players", JSON.stringify(updatedPlayers));

    // Update 'currentplayers' in localStorage
    const currentPlayers =
      JSON.parse(localStorage.getItem("currentplayers")) || [];
    const updatedCurrentPlayers = currentPlayers.map((player) => {
      if (player.username === loserUsername) {
        // Increase points by 5
        return { ...player, points: player.points + 5 };
      }
      return player;
    });
    localStorage.setItem(
      "currentplayers",
      JSON.stringify(updatedCurrentPlayers)
    );

    // Update player1 and player2 states if they match the loser
    if (player1 && player1.username === loserUsername) {
      setPlayer1((prevPlayer) => ({
        ...prevPlayer,
        points: prevPlayer.points + 5,
      }));
    } else if (player2 && player2.username === loserUsername) {
      setPlayer2((prevPlayer) => ({
        ...prevPlayer,
        points: prevPlayer.points + 5,
      }));
    }
  };

  return (
    <div className="game-container">
      <NavBar players={players} />
      <main>
        {/* Render the current game component if players are set */}
        {player1 && player2 && (
          <CurrentGameComponent
            player1={player1}
            player2={player2}
            onNextGame={handleNextGame}
            onLose={updateLosingPlayerPoints} // Pass down the updateLosingPlayerPoints function
          />
        )}
      </main>
    </div>
  );
}

export default Game;
