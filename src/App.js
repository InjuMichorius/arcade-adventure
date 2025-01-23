import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Index from "./components/pages/index";
import Game from "./components/pages/game";
import ManagePlayers from "./components/pages/managePlayers";
import { PlayerDataProvider } from "./providers/playerDataProvider";

import "./App.scss";

function App() {
  const [playersFromStorage, setPlayersFromStorage] = useState(null);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayersFromStorage(storedPlayers);
  }, []);

  if (playersFromStorage === null) {
    return <div>Loading...</div>;
  }

  return (
    <PlayerDataProvider>
      <HashRouter>
      <Routes>
        <Route path="/arcade-adventure" element={playersFromStorage.length > 1 ? <Game /> : <Index />} />
        <Route path="/manage-players" element={playersFromStorage.length > 1 ? <Game /> : <ManagePlayers />} />
        <Route path="/game" element={<Game />} />
        <Route path="/" element={<Navigate to="/arcade-adventure" />} />
        <Route path="*" element={<Navigate to="/arcade-adventure" />} />
      </Routes>
    </HashRouter>
  </PlayerDataProvider>
  );
}

export default App;
