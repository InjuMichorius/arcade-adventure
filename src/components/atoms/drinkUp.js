import React, { useEffect, useRef } from "react";
import Button from "../atoms/button";
import { faRotateRight, faForward } from "@fortawesome/free-solid-svg-icons";
import AvatarPreview from "../atoms/avatarPreview";
import drinkSound from "../../assets/sounds/drink-sound.mp3";

function DrinkUp({
  drinkMessage,
  playersToDrink,
  onPlayAgain,
  onNextGame,
  drinkAmount,
}) {
  const drinkAudioRef = useRef(new Audio(drinkSound));
  
  useEffect(() => {
    // Ensure audio is unlocked for mobile devices
    const unlockAudioContext = () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const audioContext = new AudioContext();
        const dummySource = audioContext.createBufferSource();
        dummySource.buffer = audioContext.createBuffer(1, 1, 22050);
        dummySource.connect(audioContext.destination);
        dummySource.start(0);
        dummySource.onended = () => {
          audioContext.close();
        };
      }
    };

    // Add event listener for unlocking audio context
    window.addEventListener("click", unlockAudioContext, { once: true });
    
    // Play the drink sound when the DrinkUp screen is shown
    drinkAudioRef.current.play().catch((err) => {
      console.error("Audio playback failed:", err);
    });

    return () => {
      window.removeEventListener("click", unlockAudioContext);
    };
  }, []); // Only run once when the component mounts

  return (
    <div className="drink-up">
      <h2>Drink up</h2>
      <div className="avatars-container">
        {playersToDrink.map((player, index) => (
          <div key={index} className="player-avatar">
            <AvatarPreview
              width={100}
              image={player.avatar}
              points={`+ ${drinkAmount}`}
            />
            <p>{player.username}</p>
          </div>
        ))}
      </div>
      <p className="regular-text">{drinkMessage}</p>
      <div className="button-wrapper">
        <Button
          icon={faRotateRight}
          variant="secondary"
          text="Play again"
          onClick={onPlayAgain}
          dataTestId="play-again-button"
        />
        <Button
          icon={faForward}
          variant="pushable red"
          text="Next game"
          onClick={onNextGame}
          dataTestId="next-game-button"
        />
      </div>
    </div>
  );
}

export default DrinkUp;
