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
    return playersFromStorage ? playersFromStorage : [{ id: 1, username: "", points: 0 }];
  };

  const [players, setPlayers] = useState(loadInitialPlayers);
  const [nextId, setNextId] = useState(() => JSON.parse(localStorage.getItem("nextId")) || 2);

  // Redirect to the game page if valid players are already present
  useEffect(() => {
    const playersFromStorage = JSON.parse(localStorage.getItem("players")) || [];
    const hasValidPlayers = playersFromStorage.some(player => player.username.trim() !== "");

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
    localStorage.setItem(`player_${id}_username`, username);
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
    localStorage.removeItem(`player_${id}_username`);
  };

  const handleStartGame = () => {
    navigate("/game");
  };

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
              />
            </li>
          ))}
        </ul>
        <div className="manage-players-container__button-container">
          <Button variant="secondary" icon={faPlus} onClick={addPlayer} />
          <Button
            variant="primary"
            onClick={handleStartGame}
            text="Play game"
          />
        </div>
      </main>
    </div>
  );
}

export default ManagePlayers;
