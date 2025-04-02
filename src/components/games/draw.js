import React, { useRef, useEffect, useState, useContext } from "react";
import Button from "../atoms/button";
import HowToPlay from "../atoms/howToPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faEye,
  faLightbulb,
  faQuestionCircle,
  faWhiskeyGlass,
  faForward,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import GameInstructions from "../molecules/gameInstructions";
import { PlayerDataContext } from "../../providers/playerDataProvider";
import AvatarPreview from "../atoms/avatarPreview";

const randomWords = [
  { word: "Rocket launcher" },
  { word: "Wheelie" },
  { word: "Playing cards" },
  { word: "Hot air balloon" },
  { word: "Treasure chest" },
  { word: "Roller coaster" },
  { word: "Submarine" },
  { word: "Octopus playing drums" },
  { word: "Viking ship" },
  { word: "UFO abducting a cow" },
  { word: "Knight on horseback" },
  { word: "Haunted house" },
  { word: "Fire-breathing dragon" },
  { word: "Genie coming out of a lamp" },
  { word: "A robot cooking" },
  { word: "Ice cream melting in the sun" },
  { word: "A monkey on a bicycle" },
  { word: "A wizard casting a spell" },
];

function Draw({ onNextGame }) {
  const [revealed, setRevealed] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [hidden, setHidden] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);
  const [wordChoices, setWordChoices] = useState([]);
  const [chosenWord, setChosenWord] = useState(null);
  const { players } = useContext(PlayerDataContext);
  const [drawer, setDrawer] = useState(null);
  const [guessers, setGuessers] = useState([]);

  useEffect(() => {
    generateNewWords();
    if (players.length > 1) {
      const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
      setDrawer(shuffledPlayers[0]);
      setGuessers(shuffledPlayers.slice(1));
    }
  }, [players]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.height = 500;
    canvas.width = window.innerWidth * 0.9;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctxRef.current = ctx;
  }, [hidden]);

  const generateNewWords = () => {
    const shuffledWords = [...randomWords].sort(() => 0.5 - Math.random());
    setWordChoices(shuffledWords.slice(0, 3));
    setChosenWord(null);
  };

  const handleNextGameClick = () => {
    if (chosenWord) {
      resetGame();
    }
  };

  const resetGame = () => {
    setChosenWord(null);
    generateNewWords();

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath(); // Reset the drawing state
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    if (e.touches) {
      return {
        x: e.touches[0].clientX - canvas.offsetLeft,
        y: e.touches[0].clientY - canvas.offsetTop,
      };
    }

    return {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault(); // Prevent scrolling on touch devices
    setIsDrawing(true);
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !ctxRef.current) return;
    e.preventDefault(); // Prevent scrolling on touch devices

    const ctx = ctxRef.current;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="draw-container">
      <button className="hint" onClick={() => setIsInfoModalOpen(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <h1>Draw</h1>

      {!hidden ? (
        <>
          <div className="draw-container__player-preview">
            <AvatarPreview
              width={100}
              image={drawer?.avatar}
              points={drawer?.points}
            />
            <p className="regular-text">
              <strong>{`${drawer?.username || "Someone"}`}</strong> chooses a
              word to draw
            </p>
          </div>
          <div className="word-choices">
            {wordChoices.map(({ word }) => (
              <button
                key={word}
                className={`btn ${selectedWord === word ? "active" : ""}`}
                onClick={() => revealed && setSelectedWord(word)}
                disabled={!revealed}
              >
                {revealed ? word : "?"}
              </button>
            ))}
            {!revealed && (
              <Button
                icon={faEye}
                variant="pushable red"
                text="Reveal words"
                onClick={() => setRevealed(true)}
              />
            )}
            {selectedWord && (
              <Button
                icon={faPencil}
                variant="pushable red"
                text={<>Draw {selectedWord}</>}
                onClick={() => setHidden(true)}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            className="draw-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          ></canvas>

          <div className="button-wrapper">
            <Button
              icon={faEraser}
              variant="secondary"
              text="Clear"
              onClick={resetGame}
            />
            <Button
              icon={faLightbulb}
              variant="pushable red"
              onClick={handleNextGameClick}
              text="Word Guessed"
            />
          </div>
        </>
      )}

      {isInfoModalOpen && (
        <HowToPlay
          title="Draw"
          description={
            <GameInstructions
              steps={[
                {
                  avatar: drawer?.avatar,
                  name: drawer?.username,
                  text: (
                    <>
                      <strong>{drawer?.username || "Someone"}</strong> chooses a
                      word to draw
                    </>
                  ),
                },
                {
                  text: (
                    <>
                      <div className="avatar-stack">
                        {guessers.map((guesser) => (
                          <AvatarPreview
                            key={guesser?.id}
                            width={30}
                            image={guesser?.avatar}
                            alt={guesser?.username}
                          />
                        ))}
                      </div>
                      <strong>Other players</strong> <span>have</span>
                      <span>to</span>
                      <span>guess</span> <span>the</span>
                      <span>word</span>
                    </>
                  ),
                },
                {
                  icon: faWhiskeyGlass,
                  text: (
                    <>
                      If the word is guessed, <strong>drawer</strong> and{" "}
                      <strong>guesser</strong> hand out 3 sips
                    </>
                  ),
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
    </div>
  );
}

export default Draw;
