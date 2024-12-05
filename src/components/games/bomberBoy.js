import React, { useState, useEffect } from "react";
import Button from "../atoms/button";
import Modal from "../atoms/modal";
import useRandomPlayers from "../../hooks/useRandomPlayers";
import CurrentPlayerPreview from "../organisms/currentPlayerPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faForward,
  faWhiskeyGlass,
  faRotateRight,
  faCircleRight,
  faEyeSlash,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

function BomberBoy({ onNextGame, updateSips }) {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [bombIndex, setBombIndex] = useState(null);
  const [drinksMessage, setDrinksMessage] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // For the instructions modal
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false); // For the instructions modal

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const activePlayers = storedPlayers.filter((player) => player.activePlayer);

    if (activePlayers.length >= 2) {
      setPlayer1(activePlayers[0]);
      setPlayer2(activePlayers[1]);
    } else {
      const shuffledPlayers = [...storedPlayers].sort(
        () => Math.random() - 0.5
      );
      setPlayer1(shuffledPlayers[0]);
      setPlayer2(shuffledPlayers[1]);

      const updatedPlayers = storedPlayers.map((player) => ({
        ...player,
        activePlayer:
          player === shuffledPlayers[0] || player === shuffledPlayers[1],
      }));

      localStorage.setItem("players", JSON.stringify(updatedPlayers));
    }
  }, []);

  const handleChooseCard = (index) => {
    if (winner) return;
    const newBoard = board.slice();

    if (!isPlayerOneTurn) {
      if (newBoard[index] === "chosen") return;

      if (index === bombIndex) {
        const remainingCards =
          newBoard.filter((card) => card === null).length + 1;
        updateSips(player2.username, remainingCards);
        setDrinksMessage(`${player2.username} drinks ${remainingCards}!`);
        setLoser(player2.username);
        setWinner(player1.username);
        setIsDrinkModalOpen(true);
      } else {
        newBoard[index] = "chosen";
        setDrinksMessage(`${player1.username} drinks 1!`);
        setBoard(newBoard);

        const remainingCards = newBoard.filter((card) => card === null).length;
        if (remainingCards === 1) {
          setLoser(player1.username);
          setWinner(player2.username);
        }
      }
      setIsPlayerOneTurn(true);
    }
  };

  const handleSetBomb = (index) => {
    if (winner) return;
    const newBoard = board.slice();

    if (bombIndex !== null) {
      newBoard[bombIndex] = null;
    }

    newBoard[index] = "bomb";
    setBoard(newBoard);
    setBombIndex(index);
  };

  const handleNextPlayer = () => {
    setIsPlayerOneTurn(!isPlayerOneTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true);
    setWinner(null);
    setLoser(null);
    setBombIndex(null);
    setDrinksMessage(null);
  };

  return (
    <div className="bomber-boy-container">
      <button className="hint" onClick={() => setIsInfoModalOpen(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <h1>Bomber Boy</h1>
      <CurrentPlayerPreview isPlayerOneTurn={isPlayerOneTurn} />
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${
              cell === "bomb" ? "bomb" : cell === "chosen" ? "chosen" : ""
            }`}
            onClick={() => {
              if (isPlayerOneTurn) {
                if (cell === null) handleSetBomb(index);
              } else {
                handleChooseCard(index);
              }
            }}
          >
            {cell === "bomb" && isPlayerOneTurn && "💣"}
          </div>
        ))}
      </div>

      {winner && (
        <div className="button-wrapper">
          <Button
            icon={faRotateRight}
            variant="secondary"
            onClick={resetGame}
            text="Play again"
          />
          <Button
            icon={faCircleRight}
            variant="primary"
            onClick={onNextGame}
            text="Next Game"
          />
        </div>
      )}
      {isPlayerOneTurn && bombIndex !== null && !winner && (
        <Button
          icon={faEyeSlash}
          variant="primary"
          onClick={handleNextPlayer}
          text="Hide bomb"
        />
      )}

      {isDrinkModalOpen && (
        <Modal
          title={`${loser} loses, ${winner} Wins!`}
          description={drinksMessage}
          buttons={[
            {
              icon: faWhiskeyGlass,
              text: "Drink",
              variant: "primary",
            },
          ]}
          onClose={() => setIsDrinkModalOpen(false)}
        />
      )}

      {isInfoModalOpen && (
        <Modal
          title="How to Bomber Boy"
          description="Player 1 hides the bomb in one of the tiles. Player 2 then chooses a tile. If it's the bomb player 2 drinks the same amount of sips as cards on the table. If the card is save, player 1 drinks one sip and can choose where to put the bomb next."
          buttons={[
            {
              icon: faForward,
              text: "Skip",
              variant: "secondary",
              onClick: onNextGame,
            },
            {
              icon: faGamepad,
              text: "Got it!",
              variant: "primary",
              onClick: () => setIsInfoModalOpen(false), // Close modal on button click
            },
          ]}
          onClose={() => setIsInfoModalOpen(false)} // Close modal when overlay or close button is clicked
        />
      )}
    </div>
  );
}

export default BomberBoy;
