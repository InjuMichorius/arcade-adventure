import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ManagePlayers from "./components/pages/managePlayers";
import Game from "./components/pages/game";
import NoPage from "./components/pages/noPage";
import "./App.scss";

function App() {
  const [playersFromStorage, setPlayersFromStorage] = useState(null); // Start with null to detect loading state

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayersFromStorage(storedPlayers);
  }, []);

  if (playersFromStorage === null) {
    // Optionally render a loading state while checking localStorage
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ManagePlayers />} />
        <Route path="/react-doodles" element={<ManagePlayers />} />
        <Route path="/game" element={playersFromStorage.length > 0 ? <Game /> : <Navigate to="/react-doodles" />} />
        <Route path="*" element={<NoPage />} />
        {/* Ensure this is the last route to handle any unmatched paths */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
