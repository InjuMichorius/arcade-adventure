import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Index from "./components/pages/index";
import Game from "./components/pages/game";
import ManagePlayers from "./components/pages/managePlayers";
import HowToPlay from "./components/pages/howToPlay";
import { PlayerDataProvider } from "./providers/playerDataProvider";
import { SoundProvider } from "./providers/soundProvider";

import "./App.scss";

function App() {
  const [playersFromStorage, setPlayersFromStorage] = useState(null);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    setPlayersFromStorage(storedPlayers);
  }, []);

  if (playersFromStorage === null) {
    return <div>Loading...</div>;
  }

  return (
    <PlayerDataProvider>
      <SoundProvider>
      <HashRouter>
        <Routes>
          <Route path="/arcade-adventure" element={<Index />} />
          <Route path="/manage-players" element={<ManagePlayers />} />
          <Route path="/game" element={<Game />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/" element={<Navigate to="/arcade-adventure" />} />
          <Route path="*" element={<Navigate to="/arcade-adventure" />} />
        </Routes>
      </HashRouter>
      </SoundProvider>
    </PlayerDataProvider>
  );
}

export default App;
