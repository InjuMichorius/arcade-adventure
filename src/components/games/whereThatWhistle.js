import React, { useEffect, useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../atoms/button";
import whistleSound from "../../assets/sounds/whistle.mp3";
import WinSound from "../../assets/sounds/win-sound.mp3";
import {
  faVolumeHigh,
  faStopwatch,
  faEye,
  faWhiskeyGlass,
  faForward,
  faGamepad,
  faQuestionCircle,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import HowToPlay from "../atoms/howToPlay";
import DrinkUp from "../atoms/drinkUp";
import AvatarPreview from "../atoms/avatarPreview";
import { PlayerDataContext } from "../../providers/playerDataProvider";
import GameInstructions from "../molecules/gameInstructions";

function WhereThatWhistle({ onNextGame }) {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);
  const [isDrinkUpScreen, setIsDrinkUpScreen] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [player1, setPlayer1] = useState(null);
  const [seekers, setSeekers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [searchDuration, setSearchDuration] = useState(120);
  const [whistleInterval, setWhistleInterval] = useState(30);
  const audioRef = useRef(null);
  const winAudioRef = useRef(new Audio(WinSound));
  const { players, updateSips, loading } = useContext(PlayerDataContext);
  const isPlayersSet = useRef(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) {
      updateSips(winner.username, 5);
      setIsDrinkUpScreen(true);
      setWinner(null);
    }
  }, [winner]);

  useEffect(() => {
    if (!loading && players.length > 1 && !isPlayersSet.current) {
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      setPlayer1(shuffledPlayers[0]);
      setSeekers(shuffledPlayers.slice(1));
      isPlayersSet.current = true;
    }
  }, [players, loading]);

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

    audioRef.current = new Audio(whistleSound);

    window.addEventListener("click", unlockAudioContext, { once: true });
    return () => {
      window.removeEventListener("click", unlockAudioContext);
    };
  }, []);

  const [gameOver, setGameOver] = useState(false);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    if (gameOver) {
      updateSips(
        losers.map((seeker) => seeker.username),
        10
      );
      setIsDrinkUpScreen(true);
      setGameOver(false);
    }
  }, [gameOver]);

  if (loading || players.length === 0) {
    return <div>Loading players...</div>;
  }

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
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
          setLosers(seekers);
          setGameOver(true);

          if (winAudioRef.current) {
            winAudioRef.current.currentTime = 0;
            winAudioRef.current.play().catch((err) => {
              console.error("Win sound playback failed:", err);
            });
          }
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
    setSearchDuration((prev) => {
      const newDuration = Math.max(whistleInterval + 15, prev + adjustment);
      return newDuration;
    });
  };

  const adjustWhistleInterval = (adjustment) => {
    setWhistleInterval((prev) => {
      const newInterval = Math.max(15, prev + adjustment);
      return newInterval < searchDuration ? newInterval : prev;
    });
  };

  const handleFound = () => {
    winAudioRef.current.currentTime = 0;
    winAudioRef.current.play().catch((err) => {
      console.error("Win sound playback failed:", err);
    });
    if (intervalId) clearInterval(intervalId);
    setTimeLeft(null);
    setIsFound(true);
    setWinner(player1);
  };

  const resetGame = () => {
    if (players.length > 1) {
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      setPlayer1(shuffledPlayers[0]);
      setSeekers(shuffledPlayers.slice(1));
    }
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
              text="Test sound"
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
          title={"Where that whistle"}
          description={
            <GameInstructions
              steps={[
                {
                  avatar: player1?.avatar,
                  name: player1?.username,
                  text: (
                    <>
                      <strong>
                        {player1?.username ? player1.username : "Someone"}
                      </strong>{" "}
                      hides the phone
                    </>
                  ),
                },
                {
                  icon: faVolumeUp,
                  text: (
                    <>
                      Phone will make a whistle every{" "}
                      <strong>{whistleInterval}s</strong>
                    </>
                  ),
                },
                {
                  text: (
                    <>
                      <div className="avatar-stack">
                        {seekers.map((seeker) => (
                          <AvatarPreview
                            key={seeker?.id}
                            width={30}
                            image={seeker?.avatar}
                            alt={seeker?.username}
                          />
                        ))}
                      </div>
                      <strong>Other players</strong> <span>have</span>{" "}
                      <strong>{searchDuration}s</strong> <span>to</span>{" "}
                      <span>find</span> <span>the</span> <span>phone</span>
                    </>
                  ),
                },
                {
                  icon: faWhiskeyGlass,
                  text: "Loser drinks",
                },
              ]}
            />
          }
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
          drinkMessage={isFound ? `drinks 5!` : "all drink 10!"}
          playersToDrink={isFound ? [player1] : seekers}
          drinkAmount={isFound ? 5 : 10}
          onPlayAgain={resetGame}
          onNextGame={onNextGame}
        />
      )}
    </div>
  );
}

export default WhereThatWhistle;
