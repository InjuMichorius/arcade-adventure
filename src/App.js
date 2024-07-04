import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagePlayers from './components/pages/managePlayers';
import Game from './components/pages/game';
import AvatarPreview from './components/molecules/avatarPreview';
import NoPage from './components/pages/noPage';
import "./App.scss";

function App() {
  const [players, setPlayers] = useState([{ id: 0, name: '', component: null }]);
  const [nextId, setNextId] = useState(1);

  const addPlayer = () => {
    const newId = nextId;
    setPlayers([...players, { id: newId, name: '', component: null }]);
    setNextId(nextId + 1);
  };

  const deletePlayer = (idToDelete) => {
    setPlayers(players.filter(player => player.id !== idToDelete));
  };

  const handleNameChange = (id, name) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, name } : player
    ));
  };
  

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <ManagePlayers 
            players={players} 
            addPlayer={addPlayer} 
            deletePlayer={deletePlayer} 
            handleNameChange={handleNameChange} 
          />
        } />
        <Route path="/react-doodles" element={
          <ManagePlayers 
            players={players} 
            addPlayer={addPlayer} 
            deletePlayer={deletePlayer} 
            handleNameChange={handleNameChange} 
          />
        } />
        <Route path="/game" element={<Game players={players}  />} />
        <Route path="/avatar-preview" element={<AvatarPreview />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;