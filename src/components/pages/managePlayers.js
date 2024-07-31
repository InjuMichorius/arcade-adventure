import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NameInput from '../organisms/nameInput';
import Button from '../molecules/button';

function ManagePlayers({ players, addPlayer, deletePlayer, handleNameChange }) {
  const navigate = useNavigate();
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  useEffect(() => {
    const allFilled = players.every(player => player.name.trim() !== '');
    setAllInputsFilled(allFilled);
  }, [players]);

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleAvatarChange = (id, newAvatar) => {
    const updatedPlayers = players.map(player =>
      player.id === id ? { ...player, avatar: newAvatar } : player
    );
    // This should update the player's avatar in the parent component's state
    // Assuming there is a function to update players in the parent
    console.log(newAvatar)
    handlePlayersUpdate(updatedPlayers);
  };

  // Assuming you have a function to update players
  const handlePlayersUpdate = (updatedPlayers) => {
    // This should update the players list with the new avatar selection
    // Implementation depends on how you manage state at the top level
  };

  return (
    <div className="manage-players-container">
      <h1 className="manage-players-container__title">Players</h1>
      <main>
        <ul className="manage-players-container__player-list">
          {players.map(player => (
            <li key={player.id}>
              <NameInput 
                id={player.id} 
                name={player.name} // Pass the player's name
                avatar={player.avatar} // Pass the player's avatar
                onNameChange={handleNameChange} 
                onDelete={() => deletePlayer(player.id)} 
                onAvatarChange={handleAvatarChange} // Pass avatar change handler
              />
            </li>
          ))}
        </ul>
        <div className="manage-players-container__button-container">
          {allInputsFilled && (
            <Button
              variant="secondary"
              icon={faPlus}
              onClick={addPlayer}
            />
          )}
          {allInputsFilled && (
            <Button variant="primary" onClick={handleStartGame} text="Play game" />
          )}
        </div>
      </main>
    </div>
  );
}

export default ManagePlayers;
