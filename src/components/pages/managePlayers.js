import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NameInput from '../molecules/nameInput';
import Button from '../molecules/button';

function ManagePlayers({ players, addPlayer, deletePlayer, handleNameChange }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
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
                onNameChange={handleNameChange} 
                onDelete={() => deletePlayer(player.id)} 
              />
            </li>
          ))}
        </ul>
        <div className="manage-players-container__button-container">
          <Button
            variant="secondary"
            icon={faPlus}
            onClick={addPlayer}
          />
          <Button variant="primary" onClick={handleStartGame} text="Play game" />
        </div>
      </main>
    </div>
  );
}

export default ManagePlayers;
