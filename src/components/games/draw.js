import React, { useRef, useEffect, useState, useContext } from "react";
import Button from "../atoms/button";
import HowToPlay from "../atoms/howToPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faForward,
  faEraser,
  faCircleRight,
  faQuestionCircle,
  faWhiskeyGlass,
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
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState("black");
  const [wordChoices, setWordChoices] = useState([]);
  const [chosenWord, setChosenWord] = useState(null);
  const { players } = useContext(PlayerDataContext);
  const [drawer, setDrawer] = useState(null);
  const [guessers, setGuessers] = useState([]);
  const [showWords, setShowWords] = useState(false);

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
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.6;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = selectedColor;
    ctxRef.current = ctx;
  }, [selectedColor]);

  const generateNewWords = () => {
    const shuffledWords = [...randomWords].sort(() => 0.5 - Math.random());
    setWordChoices(shuffledWords.slice(0, 3));
    setChosenWord(null);
  };

  const handleWordClick = (word) => {
    setChosenWord(word);
    setShowWords(false); // Hide word choices after selecting a word
  };

  const handleNextGameClick = () => {
    if (chosenWord) {
      alert('Word has been guessed!');
      resetGame(); // Reset the game after the word has been guessed
    }
  };

  const resetGame = () => {
    setChosenWord(null);
    generateNewWords();
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  };

  const startDrawing = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    startDrawing(e);
  };

  const handleMouseMove = (e) => {
    draw(e);
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  return (
    <div className="draw-container">
      <button className="hint" onClick={() => setIsInfoModalOpen(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <h1>Draw</h1>

      <button onClick={() => setShowWords(!showWords)}>
        {showWords ? "Hide Words" : "Show Words"}
      </button>

      {showWords && !chosenWord && (
        <>
          <p>Choose a word to draw:</p>
          <div className="word-choices">
            {wordChoices.map(({ word }) => (
              <Button
                key={word}
                text={word}
                onClick={() => handleWordClick(word)}
              />
            ))}
          </div>
        </>
      )}

      {chosenWord && (
        <p>
          <strong>{drawer?.username} is drawing:</strong> {chosenWord}
        </p>
      )}

      <canvas
        ref={canvasRef}
        className="draw-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      ></canvas>

      <div className="button-wrapper">
        <Button icon={faEraser} variant="secondary" text="Clear" onClick={resetGame} />
        <Button
          icon={faCircleRight}
          variant="pushable red"
          onClick={handleNextGameClick}
          text="Word Guessed"
        />
      </div>

      {/* {isInfoModalOpen && (
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
      )} */}
    </div>
  );
}

export default Draw;
