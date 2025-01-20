import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import NameInput from "../organisms/nameInput";
import Button from "../atoms/button";
import { useRandomAvatar } from "../../hooks/useRandomAvatar";

function ManagePlayers() {
  const navigate = useNavigate();
  const { getRandomAvatar, returnAvatar, availableAvatars } = useRandomAvatar();

  // Load initial state from localStorage or create a default player if none exist
  const loadInitialPlayers = () => {
    const playersFromStorage = JSON.parse(localStorage.getItem("players"));

    if (playersFromStorage && playersFromStorage.length > 0) {
      return playersFromStorage;
    }

    const randomAvatar = getRandomAvatar();
    return [{ id: 1, username: "", points: 0, avatar: randomAvatar }];
  };

  const [players, setPlayers] = useState(loadInitialPlayers);
  const [nextId, setNextId] = useState(
    () => JSON.parse(localStorage.getItem("nextId")) || 2
  );

  // Sync players to localStorage whenever they change
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
    if (availableAvatars.length === 0) {
      alert("No more avatars available!");
      return;
    }

    const randomAvatar = getRandomAvatar();
    const newPlayer = {
      id: nextId,
      username: "",
      points: 0,
      avatar: randomAvatar,
    };

    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    setNextId((prevNextId) => prevNextId + 1);
  };

  // Check if all player inputs are filled
  const allPlayersHaveNames = players.every(
    (player) => player.username.trim() !== ""
  );

  const canStartGame =
    players.filter((player) => player.username.trim() !== "").length >= 2;

  const deletePlayer = (id) => {
    const playerToDelete = players.find((player) => player.id === id);
    if (playerToDelete) {
      returnAvatar(playerToDelete.avatar);
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== id)
      );
    }
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

  return (
    <div className="manage-players-container">
      <h1 className="manage-players-container__title">Choose players</h1>
      <main>
        <ul className="manage-players-container__player-list">
          {players.map((player) => (
            <li key={player.id}>
              <NameInput
                id={player.id}
                onNameChange={handleNameChange}
                onDelete={deletePlayer}
                avatar={player.avatar}
                value={player.username}
              />
            </li>
          ))}
        </ul>
        <div className="manage-players-container__button-container">
          {allPlayersHaveNames && (
            <Button
              icon={faUserPlus}
              variant="pushable green"
              onClick={addPlayer}
              text="Add player"
            />
          )}
          {canStartGame && (
            <Button
              icon={faGamepad}
              variant="pushable red"
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
