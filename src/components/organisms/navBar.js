import React, { useState } from "react";
import Hamburger from "../atoms/hamburger";
import avatar from "../../assets/images/character1.png";

function NavBar() {
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(false);

  const handleHamburgerClick = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  return (
    <header className="navbar-container">
      <Hamburger onClick={handleHamburgerClick} />
      <ul className={`player-list ${isPlayerListVisible ? "show" : ""}`}>
        <h1 className="player-list__title">Leaderboard</h1>
        <li className="player-container">
          <div className="avatar-preview">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="user-details">
            <p className="player-name">Player 1</p>
            <div className="items-container">
              <div className="item">1</div>
              <div className="item">2</div>
              <div className="item">3</div>
            </div>
          </div>
          <div className="place">1</div>
        </li>
        <li className="player-container">
          <div className="avatar-preview">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="user-details">
            <p className="player-name">Player 1</p>
            <div className="items-container">
              <div className="item">1</div>
              <div className="item">2</div>
              <div className="item">3</div>
            </div>
          </div>
          <div className="place">1</div>
        </li>
        <li className="player-container">
          <div className="avatar-preview">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="user-details">
            <p className="player-name">Player 1</p>
            <div className="items-container">
              <div className="item">1</div>
              <div className="item">2</div>
              <div className="item">3</div>
            </div>
          </div>
          <div className="place">1</div>
        </li>
      </ul>
    </header>
  );
}

export default NavBar;
