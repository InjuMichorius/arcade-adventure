import React from 'react';
import { useNavigate } from 'react-router-dom';
import NameInput from '../molecules/nameInput';
import Button from '../molecules/button';
import { faCirclePlus, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

function Home({ players, addPlayer, deletePlayer, handleNameChange }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="home-container">
      <h1 className="home-container__title">Spelers</h1>
      <main>
        <ul className="home-container__player-list">
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
        <div className="home-container__button-container">
          <Button
            variant="secondary"
            text="Toevoegen"
            icon={faCirclePlus}
            onClick={addPlayer}
          />
          <Button variant="primary" onClick={handleStartGame} text="Start het spel" icon={faCirclePlay} />
        </div>
      </main>
    </div>
  );
}

export default Home;
