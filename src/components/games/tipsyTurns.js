import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import HowToPlay from "../atoms/howToPlay";
import {
  faGamepad,
  faForward,
  faRotateRight,
  faUsers,
  faQuestionCircle,
  faClipboardQuestion,
  faWhiskeyGlass,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/button";
import AvatarPreview from "../atoms/avatarPreview";
import GameInstructions from "../molecules/gameInstructions";

const TipsyTurns = ({ onNextGame, updateSips }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [remainingQuestions, setRemainingQuestions] = useState([
    { sips: 5, msg: "The tallest player drinks 5 sips." },
    { sips: 3, msg: "The player with the most points drinks 3 sips." },
    { sips: 7, msg: "The player who lost the last game drinks 7 sips." },
    { sips: 4, msg: "The player who arrived last drinks 4 sips." },
    {
      sips: 6,
      msg: "The player wearing the most colorful clothes drinks 6 sips.",
    },
    { sips: 8, msg: "The player who has the longest hair drinks 8 sips." },
    { sips: 2, msg: "The player with the most siblings drinks 2 sips." },
    { sips: 5, msg: "The player who knows the most languages drinks 5 sips." },
    { sips: 3, msg: "The player who has the most pets drinks 3 sips." },
    { sips: 7, msg: "The player who last watched a movie drinks 7 sips." },
    { sips: 10, msg: "The player who can sing the best drinks 10 sips." },
    { sips: 4, msg: "The player who plays the most sports drinks 4 sips." },
    { sips: 6, msg: "The player with the most tattoos drinks 6 sips." },
    {
      sips: 3,
      msg: "The player who has traveled to the most countries drinks 3 sips.",
    },
    { sips: 5, msg: "The player who likes coffee the most drinks 5 sips." },
    { sips: 4, msg: "The player who eats the most vegetables drinks 4 sips." },
    { sips: 7, msg: "The player who last went on a road trip drinks 7 sips." },
    {
      sips: 3,
      msg: "The player who can name the most Harry Potter books drinks 3 sips.",
    },
    { sips: 6, msg: "The player who prefers tea over coffee drinks 6 sips." },
    { sips: 5, msg: "The player who last cooked a meal drinks 5 sips." },
    { sips: 4, msg: "The player who owns the most shoes drinks 4 sips." },
    { sips: 6, msg: "The player who has the most plants drinks 6 sips." },
    { sips: 5, msg: "The player who is best at math drinks 5 sips." },
    {
      sips: 4,
      msg: "The player who can do the best impression of a celebrity drinks 4 sips.",
    },
    { sips: 7, msg: "The player who loves adventure sports drinks 7 sips." },
    { sips: 6, msg: "The player who loves cooking drinks 6 sips." },
    {
      sips: 4,
      msg: "The player who is always the first to respond drinks 4 sips.",
    },
    {
      sips: 5,
      msg: "The player who is most likely to stay up all night drinks 5 sips.",
    },
    { sips: 8, msg: "The player who is most organized drinks 8 sips." },
    {
      sips: 3,
      msg: "The player who can name the most capitals of the world drinks 3 sips.",
    },
    { sips: 7, msg: "The player who can dance the best drinks 7 sips." },
    {
      sips: 6,
      msg: "The player who is most likely to become famous drinks 6 sips.",
    },
    {
      sips: 4,
      msg: "The player who is most likely to get lost drinks 4 sips.",
    },
    { sips: 5, msg: "The player who eats the most junk food drinks 5 sips." },
    { sips: 3, msg: "The player who can draw the best drinks 3 sips." },
    {
      sips: 6,
      msg: "The player who knows the most about history drinks 6 sips.",
    },
    {
      sips: 5,
      msg: "The player who is most likely to make everyone laugh drinks 5 sips.",
    },
    { sips: 7, msg: "The player who last had a birthday drinks 7 sips." },
    {
      sips: 4,
      msg: "The player who has been awake the longest drinks 4 sips.",
    },
    {
      sips: 6,
      msg: "The player who is most likely to invent something drinks 6 sips.",
    },
    {
      sips: 7,
      msg: "The player who would be the best at a reality show drinks 7 sips.",
    },
    { sips: 5, msg: "The player who loves puzzles drinks 5 sips." },
    { sips: 8, msg: "The player who loves the outdoors drinks 8 sips." },
    { sips: 4, msg: "The player who is best at video games drinks 4 sips." },
    {
      sips: 6,
      msg: "The player who is most likely to cry during a movie drinks 6 sips.",
    },
    {
      sips: 5,
      msg: "The player who has the most unusual hobby drinks 5 sips.",
    },
    {
      sips: 4,
      msg: "The player who knows the most about science drinks 4 sips.",
    },
    {
      sips: 6,
      msg: "The player who is most likely to travel the world drinks 6 sips.",
    },
    { sips: 7, msg: "The player who has the best memory drinks 7 sips." },
    { sips: 3, msg: "The player who loves puzzles drinks 3 sips." },
    {
      sips: 5,
      msg: "The player who can quote the most movie lines drinks 5 sips.",
    },
    { sips: 4, msg: "The player who is always early drinks 4 sips." },
    {
      sips: 8,
      msg: "The player who would survive a zombie apocalypse drinks 8 sips.",
    },
  ]);

  // Retrieve players from localStorage on component mount
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    // Sort players by points in descending order
    const sortedPlayers = [...storedPlayers].sort(
      (a, b) => b.points - a.points
    );
    setPlayers(sortedPlayers);

    // Select a random question initially
    selectRandomQuestion();
  }, []);

  // Toggle selection of a player
  const togglePlayerSelection = (player) => {
    setSelectedPlayers(
      (prevSelected) =>
        prevSelected.includes(player)
          ? prevSelected.filter((p) => p !== player) // Remove if already selected
          : [...prevSelected, player] // Add if not selected
    );
  };

  // Assign sips to selected players when a new question is picked
  const applySipsToSelectedPlayers = () => {
    if (currentQuestion && selectedPlayers.length > 0) {
      selectedPlayers.forEach((player) => {
        updateSips(player.username, currentQuestion.sips);
      });
      // Optionally clear selected players after updating sips
      setSelectedPlayers([]);
    }
  };

  // Select a random question from the remaining list
  const selectRandomQuestion = () => {
    if (remainingQuestions.length === 0) return; // No more questions left

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const randomQuestion = remainingQuestions[randomIndex];

    setCurrentQuestion(randomQuestion);

    // Remove the selected question from the list
    const updatedQuestions = remainingQuestions.filter(
      (q, index) => index !== randomIndex
    );
    setRemainingQuestions(updatedQuestions);

    // Apply sips immediately after selecting a new question
    applySipsToSelectedPlayers();
  };

  return (
    <div className="tipsy-turns-container">
      <button className="hint" onClick={() => setIsInfoModalOpen(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <h1>Tipsy Turns</h1>
      <div>
        <h2>
          {currentQuestion
            ? currentQuestion.msg.replace("${sips}", currentQuestion.sips)
            : "No question available"}
        </h2>
        <div className="chosen-player-container">
          {selectedPlayers.length > 0 ? (
            selectedPlayers.map((player, index) => (
              <span key={index} className="selected-player">
                {player.username}
                {index < selectedPlayers.length - 1 && <span>,&nbsp;</span>}
              </span>
            ))
          ) : (
            <div className="empty-state">
              <FontAwesomeIcon icon={faUsers} />
              <p>Select players below.</p>
            </div>
          )}
        </div>

        <ul className="player-select-container">
          {players.length > 0 ? (
            players.map((player, index) => (
              <li
                key={index}
                className={`player-container ${
                  selectedPlayers.includes(player) ? "selected" : ""
                }`}
                onClick={() => togglePlayerSelection(player)}
              >
                <button className="player-select">
                  <AvatarPreview
                    width={80}
                    image={player.avatar}
                    points={player.points}
                  />
                  <div className="user-details">
                    <p className="player-name">{player.username}</p>
                    <div className="items-container">
                      {(player.items || []).map((item, key) => (
                        <div key={key} className="item">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <p>No players available</p>
          )}
        </ul>

        <div className="button-wrapper">
          <Button
            icon={faRotateRight}
            variant="get-new-question-button"
            onClick={selectRandomQuestion}
            text="New tipsy turn"
            disabled={remainingQuestions.length === 0}
          />
        </div>
      </div>

      {isInfoModalOpen && (
        <HowToPlay
          title="Tipsy Turns"
          description={
            <GameInstructions
              steps={[
                {
                  icon: faClipboardQuestion,
                  text: "A question will be displayed on the screen",
                },
                {
                  text: (
                    <>
                      <div className="avatar-stack">
                        {players.map((player) => (
                          <AvatarPreview
                            key={player?.id}
                            width={30}
                            image={player?.avatar}
                            alt={player?.username}
                          />
                        ))}
                      </div>
                      <strong>All players</strong> determine{" "}
                      <strong>who</strong> <span>the</span>{" "}
                      <span>question/statement</span> <span>applies</span>{" "}
                      <span>to</span>
                    </>
                  ),
                },
                {
                  icon: faWhiskeyGlass,
                  text: "The chosen player(s) drink!",
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
};

export default TipsyTurns;
