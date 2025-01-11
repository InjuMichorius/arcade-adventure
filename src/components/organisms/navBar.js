import React, { useState } from "react";
import Hamburger from "../atoms/hamburger";
import Button from "../atoms/button";
import { faPersonWalkingArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AvatarPreview from "../atoms/avatarPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar({ players }) {
  const navigate = useNavigate();
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(false);

  // Handler to leave the game and clear the players from local storage
  const handleLeaveGameClick = () => {
    localStorage.clear();
    navigate("/arcade-adventure");
    window.location.reload();
  };

  const handleHamburgerClick = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  // Sort players by points in descending order
  const sortedPlayers = players
    ? [...players].sort((a, b) => b.points - a.points)
    : [];

  return (
    <header className="navbar-container">
      <Hamburger onClick={handleHamburgerClick} />
      <div className={`player-list ${isPlayerListVisible ? "show" : ""}`}>
        <button className="primary">
          <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="icon" onClick={handleLeaveGameClick} />
        </button>
        <h1 className="player-list__title">Leaderboard</h1>
        <ul>
          {sortedPlayers.map((player, index) => (
            <li key={index} className="player-container">
              <AvatarPreview width={80} image={player.avatar} points={player.points} />
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
      </div>
    </header>
  );
}

export default NavBar;
