import React, { useState } from "react";
import Hamburger from "../atoms/hamburger";
import Button from "../atoms/button";
import avatar from "../../assets/images/character1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";

function NavBar({ players, onLeaveGameClick }) {
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(false);

  const handleHamburgerClick = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  return (
    <header className="navbar-container">
      <Hamburger onClick={handleHamburgerClick} />
      <div className={`player-list ${isPlayerListVisible ? "show" : ""}`}>
        <h1 className="player-list__title">Leaderboard</h1>
        <ul>
          {players && players.map((player, index) => (
            <li key={index} className="player-container">
              <div className="avatar-preview">
                <img src={avatar} alt="Avatar" />
                <p className="points-text">{player.points}<FontAwesomeIcon icon={faWineBottle} className='icon' /></p>
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
        <Button variant="primary" text="Leave arcade" onClick={onLeaveGameClick} />
      </div>
    </header>
  );
}

export default NavBar;
