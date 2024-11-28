import React, { useState, useEffect } from "react";
import Button from "../atoms/button";
import Modal from "../atoms/modal";
import useRandomPlayers from "../../hooks/useRandomPlayers";
import CurrentPlayerPreview from "../organisms/currentPlayerPreview";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function GridGamble({ onNextGame, updateSips }) {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [bombIndex, setBombIndex] = useState(null);
  const [drinksMessage, setDrinksMessage] = useState(null); // To store drinks message

  useEffect(() => {
    // Retrieve players from localStorage
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

    // If we don't have two players, select them randomly
    if (storedPlayers.length >= 2) {
      const shuffledPlayers = [...storedPlayers].sort(() => Math.random() - 0.5);  // Shuffle players
      setPlayer1(shuffledPlayers[0]);
      setPlayer2(shuffledPlayers[1]);
    }
  }, []);
  useRandomPlayers(2)

  const handleChooseCard = (index) => {
    if (winner) return;

    const newBoard = board.slice();

    if (!isPlayerOneTurn) {
      // Prevent selection of already chosen cards
      if (newBoard[index] === "chosen") {
        return;
      }

      if (index === bombIndex) {
        // Player 2 drinks all remaining cards
        const remainingCards = newBoard.filter(card => card === null).length;
        updateSips(player2.username, remainingCards);
        setDrinksMessage(`${player2.username} drinks ${remainingCards}!`);
        setLoser(player2.username);
        setWinner(player1.username);
      } else {
        // Mark card as chosen
        newBoard[index] = "chosen";
        setBoard(newBoard);

        // Check if Player 2 wins by having only one card left
        const remainingCards = newBoard.filter(card => card === null).length;
        if (remainingCards === 1) {
          setWinner(player2.username); // Player 2 wins
        }
      }
      setIsPlayerOneTurn(true); // Switch back to Player 1's turn
    }
  };

  const handleSetBomb = (index) => {
    if (winner) return;
    const newBoard = board.slice();

    // If there's already a bomb, remove it
    if (bombIndex !== null) {
      newBoard[bombIndex] = null; // Clear the previous bomb position
    }

    newBoard[index] = "bomb"; // Mark new bomb location
    setBoard(newBoard);
    setBombIndex(index); // Set the bomb index
  };

  const handleNextPlayer = () => {
    setIsPlayerOneTurn(!isPlayerOneTurn); // Switch turns
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true); // Reset to player 1
    setWinner(null);
    setLoser(null);
    setBombIndex(null);
    setDrinksMessage(null); // Reset drinks message
  };

  return (
    <div className="grid-gamble-container">
      <h1>Grid Gamble</h1>
        <CurrentPlayerPreview
          isPlayerOneTurn={isPlayerOneTurn}
        />
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell === "bomb" ? "bomb" : cell === "chosen" ? "chosen" : ""}`}
            onClick={() => {
              if (isPlayerOneTurn) {
                // Player 1 chooses where to place the bomb
                if (cell === null) handleSetBomb(index);
              } else {
                console.log("Player 2 is trying to choose card at index:", index);
                handleChooseCard(index);
              }
            }}
          >
            {/* Only show the bomb if it's Player 1's turn and the bomb has been set */}
            {cell === "bomb" && isPlayerOneTurn && "💣"}
          </div>
        ))}
      </div>

      {winner && (
        <>
        <Modal
          title={`${winner} Wins!`}
          description={drinksMessage || "Congratulations!"}
          buttons={[
            {
              text: "Play again",
              variant: "primary",
              onClick: resetGame,
            },
            {
              text: "Next Game",
              variant: "secondary",
              onClick: onNextGame,
            },
          ]}
        />
        </>
      )}

      {winner && (
        <div className="button-wrapper">
          <Button icon={faRotateRight} variant="secondary" onClick={resetGame} text="Play again" />
          <Button icon={faCircleRight} variant="primary" onClick={onNextGame} text="Next Game" />
        </div>
      )}
      {isPlayerOneTurn && bombIndex !== null && !winner && (
        <Button icon={faEyeSlash} variant="primary" onClick={handleNextPlayer} text="Hide bomb" />
      )}
    </div>
  );
}

export default GridGamble;
