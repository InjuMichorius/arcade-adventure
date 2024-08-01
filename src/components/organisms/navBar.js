import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hamburger from "../atoms/hamburger";
import Button from "../atoms/button";
import avatar from "../../assets/images/character1.png";

function NavBar({ players }) {
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(false);
  const navigate = useNavigate();

  const handleHamburgerClick = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  const handleLeaveGameClick = () => {
    localStorage.clear();  // Clear localStorage
    navigate("/");
  };

  return (
    <header className="navbar-container">
      <Hamburger onClick={handleHamburgerClick} />
      <div className={`player-list ${isPlayerListVisible ? "show" : ""}`}>
        <h1 className="player-list__title">Leaderboard</h1>
        <ul>
          {players.map((player, index) => (
            <li key={index} className="player-container">
              <div className="avatar-preview">
                <img src={avatar} alt="Avatar" />
                <p className="points-text">{`${player.points} sips`}</p>
              </div>
              <div className="user-details">
                <p className="player-name">{player.username}</p>
                <div className="items-container">
                  {(player.items || []).map((item, key) => (
                    <div key={key} className="item">{item}</div>
                  ))}
                </div>
              </div>
              <div className="place">{index + 1}</div>
            </li>
          ))}
        </ul>
        <Button variant="primary" text="Leave arcade" onClick={handleLeaveGameClick} />
      </div>
    </header>
  );
}

export default NavBar;
