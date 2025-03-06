import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useEffect } from "react";
import { PlayerDataContext } from "../../providers/playerDataProvider";
import HowToPlay from "../atoms/howToPlay";
import {
  faGamepad,
  faForward,
  faUsers,
  faQuestionCircle,
  faClipboardQuestion,
  faWhiskeyGlass,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/button";
import AvatarPreview from "../atoms/avatarPreview";
import GameInstructions from "../molecules/gameInstructions";
import questions from "../../assets/data/tipsyTurns";

const TipsyTurns = ({ onNextGame }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [remainingQuestions, setRemainingQuestions] = useState(questions);
  const { players, updateSips, loading } = useContext(PlayerDataContext);

  useEffect(() => {
    if (!loading && players.length > 0 && remainingQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      setCurrentQuestion(remainingQuestions[randomIndex]);
    }
  }, [players, loading]);

  // Check if players are loading or empty
  if (loading || players.length === 0) {
    return <div>Loading players...</div>; // Show loading until players are available
  }

  // Toggle selection of a player
  const togglePlayerSelection = (player) => {
    setSelectedPlayers(
      (prevSelected) =>
        prevSelected.includes(player)
          ? prevSelected.filter((p) => p !== player) // Remove if already selected
          : [...prevSelected, player] // Add if not selected
    );
  };

  const selectRandomQuestion = () => {
    if (remainingQuestions.length === 0 || selectedPlayers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const randomQuestion = remainingQuestions[randomIndex];

    setCurrentQuestion(randomQuestion);

    // Update sips with the latest selected question, not the previous state
    selectedPlayers.forEach((player) => {
      updateSips(player.username, currentQuestion.sips);
    });

    const updatedQuestions = remainingQuestions.filter(
      (q, index) => index !== randomIndex
    );

    setRemainingQuestions(updatedQuestions);
    setSelectedPlayers([]); // Clear selected players after the question is processed
  };

  return (
    <div className="tipsy-turns-container">
      <button className="hint" onClick={() => setIsInfoModalOpen(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <h1>Tipsy Turns</h1>
      <div>
        <h2>
          {currentQuestion &&
            currentQuestion.msg.replace("${sips}", currentQuestion.sips)}
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
                    points={player.points ? player.points : "0"}
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
            icon={faWhiskeyGlass}
            variant="pushable red"
            onClick={selectRandomQuestion}
            text="Drink"
            disabled={
              remainingQuestions.length === 0 || selectedPlayers.length === 0
            }
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
