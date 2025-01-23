import React, { useEffect, useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../atoms/button";
import whistleSound from "../../assets/sounds/whistle.mp3";
import {
  faVolumeHigh,
  faStopwatch,
  faEye,
  faForward,
  faGamepad,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import HowToPlay from "../atoms/howToPlay";
import DrinkUp from "../atoms/drinkUp";
import AvatarPreview from "../atoms/avatarPreview";
import { PlayerDataContext } from "../../providers/playerDataProvider";

function WhereThatWhistle({ onNextGame }) {
  const { updatePlayer } = useContext(PlayerDataContext); // access updatePlayer
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);
  const [isDrinkUpScreen, setIsDrinkUpScreen] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [player1, setPlayer1] = useState(null);
  const [seekers, setSeekers] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [searchDuration, setSearchDuration] = useState(2); // TODO: Reset this to 120
  const [whistleInterval, setWhistleInterval] = useState(30); // Default to 30 seconds
  const audioRef = useRef(null);

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

  const updatePlayerPoints = (id, points) => {
    updatePlayer(id, { points });
  };

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    if (storedPlayers.length === 0) return;

    const shuffledPlayers = [...storedPlayers].sort(() => Math.random() - 0.5);

    setPlayer1(shuffledPlayers[0]);
    setSeekers(shuffledPlayers.slice(1));

    audioRef.current = new Audio(whistleSound);
  }, []);

  useEffect(() => {
    if (player1) {
      updatePlayerPoints(player1.id, player1.points + 5); // Example of updating points after a game action
    }
  }, [player1, updatePlayer]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  const updateSips = (username, points) => {
    const player = player1?.username === username ? player1 : seekers?.find((player) => player.username === username);
    if (player) {
      updatePlayer(player.id, { points: player.points + points }); // Update points for player
    }
  };

  const startSearch = () => {
    if (intervalId) clearInterval(intervalId);

    setTimeLeft(searchDuration);

    const newIntervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === null || prevTime <= 1) {
          clearInterval(newIntervalId);
          setIsFound(false);
          seekers.forEach(seeker => {
            updateSips(seeker.username, 10); // Add 10 points for seekers
          });
          setIsDrinkUpScreen(true);
          return null;
        }

        if ((prevTime - 1) % whistleInterval === 0) {
          playSound();
        }

        return prevTime - 1;
      });
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const adjustSearchDuration = (adjustment) => {
    setSearchDuration((prev) => Math.max(60, prev + adjustment));
  };

  const adjustWhistleInterval = (adjustment) => {
    setWhistleInterval((prev) => Math.max(15, prev + adjustment));
  };

  const handleFound = () => {
    if (intervalId) clearInterval(intervalId);
    setTimeLeft(null);
    setIsFound(true);
    updateSips(player1.username, 5); // Add 5 points to the player who hid the phone
    setIsDrinkUpScreen(true);
  };

  const resetGame = () => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    if (storedPlayers.length === 0) return;

    const shuffledPlayers = [...storedPlayers].sort(() => Math.random() - 0.5);
    setPlayer1(shuffledPlayers[0]);
    setSeekers(shuffledPlayers.slice(1));

    setIsDrinkUpScreen(false);
    setIsFound(false);
    setTimeLeft(null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="where-that-whistle">
      <button className="hint" onClick={() => setIsInfoModalOpen(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <h1>Where that whistle</h1>
      {!timeLeft ? (
        <div className="hider-container">
          <AvatarPreview
            width={100}
            image={player1?.avatar}
            points={player1?.points}
          />
          <p className="regular-text">
            {`${player1?.username || "Someone"}`} hides the phone.
          </p>
        </div>
      ) : (
        <p className="regular-text">{formatTime(timeLeft)}</p>
      )}
      {timeLeft !== null && (
        <Button
          icon={faEye}
          variant="pushable red"
          text="Found"
          onClick={handleFound}
        />
      )}
      {timeLeft === null && (
        <>
          <div className="time-container">
            <h2 className="time-title">Time to search</h2>
            <div className="time-controls">
              <button onClick={() => adjustSearchDuration(-15)}>-15s</button>
              <span className="time-display">{formatTime(searchDuration)}</span>
              <button onClick={() => adjustSearchDuration(15)}>+15s</button>
            </div>
          </div>
          <div className="time-container">
            <h2 className="time-title">Whistle Interval</h2>
            <div className="time-controls">
              <button onClick={() => adjustWhistleInterval(-15)}>-15s</button>
              <span className="time-display">
                {formatTime(whistleInterval)}
              </span>
              <button onClick={() => adjustWhistleInterval(15)}>+15s</button>
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              icon={faVolumeHigh}
              variant="transparent"
              text="Play sound"
              onClick={playSound}
            />
            <Button
              icon={faStopwatch}
              variant="pushable red"
              text="Start search"
              onClick={startSearch}
            />
          </div>
        </>
      )}
      {isInfoModalOpen && (
        <HowToPlay
          title="Where that whistle"
          description={`${
            player1?.username || "Someone"
          } hides the phone while the others look away. Once hidden, the seekers must find the phone guided by its whistle, which sounds every 30 seconds. Customize the search time and whistle interval to match your challenge level!`}
          buttons={[
            {
              icon: faForward,
              text: "Skip game",
              variant: "secondary",
              onClick: onNextGame,
            },
            {
              icon: faGamepad,
              text: "Play game",
              variant: "pushable red",
              onClick: () => setIsInfoModalOpen(false),
            },
          ]}
          onClose={() => setIsInfoModalOpen(false)}
        />
      )}
      {isDrinkUpScreen && (
        <DrinkUp
          drinkMessage={
            isFound
              ? `drinks 5!`
              : "all drink 10!"
          }
          playersToDrink={isFound ? [player1] : seekers}
          onPlayAgain={resetGame}
          onNextGame={onNextGame}
        />
      )}
    </div>
  );
}

export default WhereThatWhistle;
