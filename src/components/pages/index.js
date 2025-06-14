import React, { useState, useEffect } from "react";
import {
  faGamepad,
  faUserPlus,
  faQuestionCircle,
  faVolumeMute,
  faVolumeLow,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/button";
import logo from "../../assets/images/homepage-logo.jpg";
import { useNavigate } from "react-router-dom";

import avatar0 from "../../assets/images/avatars/avatar0.avif";
import avatar1 from "../../assets/images/avatars/avatar1.avif";
import avatar2 from "../../assets/images/avatars/avatar2.avif";
import avatar3 from "../../assets/images/avatars/avatar3.avif";
import avatar4 from "../../assets/images/avatars/avatar4.avif";
import avatar5 from "../../assets/images/avatars/avatar5.avif";
import avatar6 from "../../assets/images/avatars/avatar6.avif";
import avatar7 from "../../assets/images/avatars/avatar7.avif";
import avatar8 from "../../assets/images/avatars/avatar8.avif";
import avatar9 from "../../assets/images/avatars/avatar9.avif";
import avatar10 from "../../assets/images/avatars/avatar10.avif";
import { useSound } from "../../providers/soundProvider";

const avatarImages = [
  avatar0,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
];

function Index() {
  const {
    toggleMute,
    toggleIsMusicPlaying,
    isMuted,
    isMusicPlaying,
  } = useSound(); // Use the mute functionality
  const navigate = useNavigate();
  const [hasPlayers, setHasPlayers] = useState(false);

  useEffect(() => {
    const players = JSON.parse(localStorage.getItem("players")) || [];
    setHasPlayers(players.length > 0);
  }, []);

  const handleNewGame = () => {
    localStorage.clear();
    setHasPlayers(false);
    navigate("/manage-players");
  };

  const handleToggleMute = () => {
    toggleMute();
  };

  const handleToggleIsMusicPlaying = () => {
    toggleIsMusicPlaying();
  };

  return (
    <div className="homepage-container">
      <main className="homepage-container__content">
        <img src={logo} alt="Homepage Logo" width="260" />
        <div className="marquee-container">
          <div className="marquee-wrapper">
            <div className="marquee">
              {avatarImages.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index}`}
                  width={150}
                  height={150}
                />
              ))}
            </div>
            <div className="marquee">
              {avatarImages.map((avatar, index) => (
                <img
                  key={index + avatarImages.length}
                  src={avatar}
                  alt={`Avatar ${index + avatarImages.length}`}
                  width={150}
                  height={150}
                />
              ))}
            </div>
          </div>
        </div>
        <ul>
          {!hasPlayers ? (
            <>
              <li>
                <Button
                  icon={faGamepad}
                  variant="pushable red"
                  onClick={() => navigate("/manage-players")}
                  text="Play game"
                  dataTestId="play-game-button"
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <Button
                  icon={faGamepad}
                  variant="pushable red"
                  onClick={() => navigate("/game")}
                  text="Continue"
                  dataTestId="continue-game-button"
                />
              </li>
              <li>
                <Button
                  icon={faUserPlus}
                  variant="pushable green"
                  onClick={handleNewGame}
                  text="New game"
                />
              </li>
            </>
          )}
          <li>
            <Button
              icon={faQuestionCircle}
              variant="pushable green"
              onClick={() => navigate("/how-to-play")}
              text="How to play"
            />
          </li>
          <li className="button-wrapper">
            {isMuted ? (
              <Button
                icon={faVolumeLow}
                variant="pushable green"
                onClick={handleToggleMute}
                text="Sounds on"
              />
            ) : (
              <Button
                icon={faVolumeMute}
                variant="pushable green"
                onClick={handleToggleMute}
                text="Sounds off"
              />
            )}
            {isMusicPlaying ? (
              <Button
                icon={faVolumeMute}
                variant="pushable green"
                onClick={handleToggleIsMusicPlaying}
                text="Music off"
              />
            ) : (
              <Button
                icon={faVolumeLow}
                variant="pushable green"
                onClick={handleToggleIsMusicPlaying}
                text="Music on"
              />
            )}
          </li>
        </ul>
      </main>
    </div>
  );
}

export default Index;
