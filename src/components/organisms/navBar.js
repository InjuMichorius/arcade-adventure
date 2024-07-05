import React, { useState } from "react";
import Hamburger from "../atoms/hamburger";
import avatar from "../../assets/images/character1.png";

function NavBar({ players }) {
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(false);

  const handleHamburgerClick = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  return (
    <header className="navbar-container">
      <Hamburger onClick={handleHamburgerClick} />
      <ul className={`player-list ${isPlayerListVisible ? "show" : ""}`}>
        <h1 className="player-list__title">Leaderboard</h1>
        {players.map((player, index) => (
          <li key={index} className="player-container">
            <div className="avatar-preview">
              <img src={avatar} alt="Avatar" />
            </div>
            <div className="user-details">
              <p className="player-name">{player.name}</p>
              <div className="items-container">
                {(player.items || []).map((item, key) => ( // Provide a default empty array
                  <div key={key} className="item">{item}</div>
                ))}
              </div>
            </div>
            <div className="place">{index + 1}</div>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default NavBar;
