import React, { useEffect, useState, useRef } from "react";
import Button from "../atoms/button";
import CurrentPlayerPreview from "../molecules/currentPlayerPreview";
import whistleSound from "../../assets/sounds/whistle.mp3";
import {
  faVolumeHigh,
  faMagnifyingGlass,
  faDice,
  faMagnifyingGlassLocation,
  faWhiskeyGlass,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../atoms/modal";

function WhereThatWhistle({ onNextGame, updateSips }) {
  const [player1, setPlayer1] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null); // Timer state
  const [intervalId, setIntervalId] = useState(null); // Interval ID to clear timer
  const audioRef = useRef(null); // Reference to audio element

  // Ensure AudioContext is unlocked on the first interaction
  useEffect(() => {
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

    window.addEventListener("click", unlockAudioContext, { once: true });
    return () => {
      window.removeEventListener("click", unlockAudioContext);
    };
  }, []);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const activePlayers = storedPlayers.filter((player) => player.activePlayer);

    if (activePlayers.length >= 2) {
      setPlayer1(activePlayers[0]);
    } else {
      const shuffledPlayers = [...storedPlayers].sort(
        () => Math.random() - 0.5
      );
      setPlayer1(shuffledPlayers[0]);

      const updatedPlayers = storedPlayers.map((player) => ({
        ...player,
        activePlayer: player === shuffledPlayers[0],
      }));

      localStorage.setItem("players", JSON.stringify(updatedPlayers));
    }

    // Preload audio
    audioRef.current = new Audio(whistleSound);
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to the start
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  const startSearch = () => {
    if (intervalId) clearInterval(intervalId); // Clear any existing intervals

    setTimeLeft(120); // Set timer to 2 minutes (120 seconds)

    const newIntervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === null || prevTime <= 1) {
          clearInterval(newIntervalId);
          console.log("end");
          return null;
        }

        if ((prevTime - 1) % 30 === 0) {
          playSound(); // Play sound every 30 seconds
        }

        return prevTime - 1;
      });
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const handleFound = () => {
    console.log("end");
    if (intervalId) clearInterval(intervalId);
    setTimeLeft(null);
  };

  return (
    <div className="tic-tac-toe-container">
      <h1>Where that whistle</h1>
      <CurrentPlayerPreview />
      {/* <Modal
        title="Which player drinks SIP_AMOUNT?"
        description={"kekjo"}
        buttons={[
          {
            icon: faDice,
            text: "Randomize",
            variant: "pushable green",
          },
          {
            icon: faWhiskeyGlass,
            text: ".. drinks",
            variant: "pushable red",
          },
        ]}
      /> */}
      <p className="regular-text">
        Hides the phone, other players close their eyes
      </p>

      {timeLeft !== null && (
        <>
          <p className="timer">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </p>
          <Button
            icon={faMagnifyingGlass}
            variant="pushable green"
            text="Found"
            onClick={handleFound}
          />
        </>
      )}

      {timeLeft === null && (
        <div className="button-wrapper">
          <Button
            icon={faVolumeHigh}
            variant="secondary"
            text="Play sound"
            onClick={playSound}
          />
          <Button
            icon={faMagnifyingGlass}
            variant="pushable red"
            text="Start search"
            onClick={startSearch}
          />
        </div>
      )}
      <Button
        icon={faMagnifyingGlass}
        variant="pushable red"
        text="Skip game"
        onClick={onNextGame}
      />
    </div>
  );
}

export default WhereThatWhistle;
