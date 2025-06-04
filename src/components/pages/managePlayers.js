import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import NameInput from "../organisms/nameInput";
import Button from "../atoms/button";
import { useRandomAvatar } from "../../hooks/useRandomAvatar";
import { PlayerDataContext } from "../../providers/playerDataProvider"; // Import context

function ManagePlayers() {
  const navigate = useNavigate();
  const { getRandomAvatar, returnAvatar, availableAvatars } = useRandomAvatar();
  const { players, setPlayers } = useContext(PlayerDataContext); // Access context here
  const inputRefs = useRef({});

  const [nextId, setNextId] = useState(
    () => JSON.parse(localStorage.getItem("nextId")) || 2
  );
  const [newPlayerId, setNewPlayerId] = useState(null);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("nextId", nextId);
  }, [players, nextId]);

  // We intentionally omit newPlayerId from deps to prevent infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (newPlayerId !== null && inputRefs.current[newPlayerId]) {
      inputRefs.current[newPlayerId].focus();
    }
  }, [players, newPlayerId]);

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
    // Focus will happen in the next render
    setNewPlayerId(nextId);
  };

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
    const validPlayers = players.filter(
      (player) => player.username.trim() !== ""
    );
    setPlayers(validPlayers);
    localStorage.setItem("players", JSON.stringify(validPlayers));

    if (validPlayers.length > 1) {
      navigate("/game");
    }
  };

  const allPlayersHaveNames = players.every(
    (player) => player.username.trim() !== ""
  );
  const canStartGame =
    players.filter((player) => player.username.trim() !== "").length >= 2;

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
                ref={(el) => (inputRefs.current[player.id] = el)}
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
              data-testid="add-player-button"
            />
          )}
          {canStartGame && (
            <Button
              icon={faGamepad}
              variant="pushable red"
              onClick={handleStartGame}
              text="Play game"
              data-testid="start-game-button"
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default ManagePlayers;
