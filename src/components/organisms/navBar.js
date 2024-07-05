import React, { useState } from "react";
import Hamburger from "../atoms/hamburger";
import avatar from "../../assets/images/character1.png";

function NavBar({ players }) { // Destructure players from props
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(false);

  const handleHamburgerClick = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  const dummyPlayers = [
    {
      name: 'Inju',
      items: [1, 2, 3]
    },
    {
      name: 'Andere Inju',
      items: [4, 5, 6]
    }
  ];

  return (
    <header className="navbar-container">
      <Hamburger onClick={handleHamburgerClick} />
      <ul className={`player-list ${isPlayerListVisible ? "show" : ""}`}>
        <h1 className="player-list__title">Leaderboard</h1>
        {dummyPlayers.map((player, index) => (
          <li key={index} className="player-container">
            <div className="avatar-preview">
              <img src={avatar} alt="Avatar" />
            </div>
            <div className="user-details">
              <p className="player-name">{player.name}</p>
              <div className="items-container">
                {player.items.map((item, key) => (
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
