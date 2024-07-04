import React, { useState } from "react";
import Hamburger from "../atoms/hamburger";

function NavBar() {
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(false);

  const handleHamburgerClick = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  return (
    <header className="navbar-container">
      <Hamburger onClick={handleHamburgerClick} />
      <ul className={`player-list ${isPlayerListVisible ? "show" : ""}`}>
        <h1>Leaderboard</h1>
        <li className="player-container">
          <div className="avatar-preview">avatar</div>
          <div className="place">1</div>
        </li>
      </ul>
    </header>
  );
}

export default NavBar;
