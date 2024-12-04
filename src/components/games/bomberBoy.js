import React, { useState, useEffect } from "react";
import Button from "../atoms/button";
import Modal from "../atoms/modal";
import useRandomPlayers from "../../hooks/useRandomPlayers";
import CurrentPlayerPreview from "../organisms/currentPlayerPreview";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function BomberBoy({ onNextGame, updateSips }) {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [bombIndex, setBombIndex] = useState(null);
  const [drinksMessage, setDrinksMessage] = useState(null); // To store drinks message

  useEffect(() => {
    // Retrieve activePlayers from localStorage
    const activePlayers = JSON.parse(localStorage.getItem('activePlayers'));
  
    if (activePlayers && activePlayers.length >= 2) {
      setPlayer1(activePlayers[0]);
      setPlayer2(activePlayers[1]);
      console.log("Loaded active players:", activePlayers);
    } else {
      console.warn("No active players found, randomizing players.");
      const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
      if (storedPlayers.length >= 2) {
        const shuffledPlayers = [...storedPlayers].sort(() => Math.random() - 0.5);
        setPlayer1(shuffledPlayers[0]);
        setPlayer2(shuffledPlayers[1]);
        localStorage.setItem('activePlayers', JSON.stringify(shuffledPlayers.slice(0, 2))); // Save to activePlayers
        console.log("Randomized players:", shuffledPlayers.slice(0, 2));
      }
    }
  }, []);
  useRandomPlayers(2);

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
        setDrinksMessage(`${player1.username} drinks 1!`);
        setBoard(newBoard);

        // Check if Player 2 wins by having only one card left
        const remainingCards = newBoard.filter(card => card === null).length;
        if (remainingCards === 1) {
          setLoser(player1.username);
          setWinner(player2.username);
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
    <div className="bomber-boy-container">
      <h1>Bomber Boy</h1>
        <CurrentPlayerPreview
          isPlayerOneTurn={isPlayerOneTurn}
        />
        {/* <p>Player 1: {player1?.username}, Player 2: {player2?.username}</p> */}
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
          title={`${loser} loses, ${winner} Wins!`}
          description={drinksMessage}
          buttons={[
            {
              text: "Drink",
              variant: "primary",
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

export default BomberBoy;
