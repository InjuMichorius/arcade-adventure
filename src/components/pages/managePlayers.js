import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NameInput from "../organisms/nameInput";
import Button from "../atoms/button";

function ManagePlayers() {
  const navigate = useNavigate();

  // Load initial state from localStorage or use default state
  const loadInitialPlayers = () => {
    const playersFromStorage = JSON.parse(localStorage.getItem("players"));
    return playersFromStorage
      ? playersFromStorage
      : [{ id: 1, username: "", points: 0 }];
  };

  const [players, setPlayers] = useState(loadInitialPlayers);
  const [nextId, setNextId] = useState(
    () => JSON.parse(localStorage.getItem("nextId")) || 2
  );

  // Redirect to the game page if valid players are already present
  useEffect(() => {
    const playersFromStorage =
      JSON.parse(localStorage.getItem("players")) || [];
    const hasValidPlayers = playersFromStorage.some(
      (player) => player.username.trim() !== ""
    );

    if (hasValidPlayers) {
      navigate("/game");
    }
  }, [navigate]);

  // Sync state to localStorage whenever players state changes
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("nextId", nextId);
  }, [players, nextId]);

  const handleNameChange = (id, username) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, username } : player
      )
    );
  };

  const addPlayer = () => {
    const newPlayer = { id: nextId, username: "", points: 0 };
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    setNextId((prevNextId) => prevNextId + 1);
  };

  const deletePlayer = (id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== id)
    );
  };

  const handleStartGame = () => {
    // Filter out players with empty usernames
    const validPlayers = players.filter(
      (player) => player.username.trim() !== ""
    );

    // Update the players state and local storage with the filtered list
    setPlayers(validPlayers);
    localStorage.setItem("players", JSON.stringify(validPlayers));

    // Navigate to the game page if there are valid players
    if (validPlayers.length > 0) {
      navigate("/game");
    } else {
      alert("Please add at least two players to start the game.");
    }
  };

  // Check if all player inputs are filled
  const allPlayersHaveNames = players.every(
    (player) => player.username.trim() !== ""
  );

  // Check if at least two player inputs are filled
  const canStartGame =
    players.filter((player) => player.username.trim() !== "").length >= 2;

  return (
    <div className="manage-players-container">
      <h1 className="manage-players-container__title">Players</h1>
      <main>
        <ul className="manage-players-container__player-list">
          {players.map((player) => (
            <li key={player.id}>
              <NameInput
                id={player.id}
                onNameChange={handleNameChange}
                onDelete={deletePlayer}
                value={player.username} // Pass the current username to the NameInput component
              />
            </li>
          ))}
        </ul>
        <div className="manage-players-container__button-container">
          {allPlayersHaveNames && (
            <Button variant="secondary" icon={faPlus} onClick={addPlayer} />
          )}
          {canStartGame && (
            <Button
              variant="primary"
              onClick={handleStartGame}
              text="Play game"
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default ManagePlayers;
