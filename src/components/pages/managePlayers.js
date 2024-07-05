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
                onNameChange={handleNameChange} 
                onDelete={() => deletePlayer(player.id)} 
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
