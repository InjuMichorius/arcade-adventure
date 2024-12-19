import React, { useEffect, useState } from "react";
import Button from "../atoms/button";
import Modal from "../atoms/modal";
import CurrentPlayerPreview from "../molecules/currentPlayerPreview";
import {
  faWhiskeyGlass,
  faRotateRight,
  faCircleRight,
} from "@fortawesome/free-solid-svg-icons";

function TicTacToe({ onNextGame, updateSips }) {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [drinksMessage, setDrinksMessage] = useState(null);
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loser, setLoser] = useState(null);
  const currentSymbol = isPlayerOneTurn ? "cross" : "circle";

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

  const handleClick = (index) => {
    // Prevent further moves if the cell is already occupied or if there's a winner
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentSymbol;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      const winningPlayer =
        gameWinner === "cross" ? player1.username : player2.username;
      const losingPlayer =
        gameWinner === "cross" ? player2.username : player1.username;

      setWinner(winningPlayer);
      setLoser(losingPlayer); // Set the loser state
      setDrinksMessage(`${losingPlayer} drinks 10`);
      setIsDrinkModalOpen(true);

      // Update the losing player's points
      updateSips(losingPlayer, 10);
    } else if (newBoard.every((cell) => cell)) {
      setWinner("Draw");
      setLoser(null);
    } else {
      setIsPlayerOneTurn(!isPlayerOneTurn);
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(!isPlayerOneTurn); // Toggle the starting player
    setWinner(null);
    setLoser(null); // Reset loser state
  };

  return (
    <div className="tic-tac-toe-container">
      <h1>Tic Tac Toe</h1>
      <CurrentPlayerPreview
        player1={player1}
        player2={player2}
        isPlayerOneTurn={isPlayerOneTurn} // Pass the turn state as a prop
      />
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleClick(index)}
          >
            {cell && <div className={cell}></div>}
          </div>
        ))}
      </div>
      {isDrinkModalOpen &&
        <Modal
        title={`Drink up`}
        description={drinksMessage}
        buttons={[
          {
            icon: faWhiskeyGlass,
            text: "Drink",
            variant: "pushable red",
          },
        ]}
        onClose={() => setIsDrinkModalOpen(false)}
      />
      }
      {winner && (
        <>
          <div className="button-wrapper">
            <Button
              icon={faRotateRight}
              variant="secondary"
              onClick={resetGame}
              text="Play again"
            />
            <Button
              icon={faCircleRight}
              variant="pushable red"
              onClick={onNextGame}
              text="Next Game"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TicTacToe;
