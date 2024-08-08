import React, { useState } from "react";
import Button from "../atoms/button";
import CurrentPlayerPreview from "../organisms/currentPlayerPreview"; // Import the component

function TicTacToe({ player1, player2, onNextGame, onLose }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const currentPlayer = isPlayerOneTurn ? player1.username : player2.username;
  const currentSymbol = isPlayerOneTurn ? "cross" : "circle";

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentSymbol;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner === "cross" ? player1.username : player2.username);

      // Update the losing player's points
      onLose(gameWinner === "cross" ? player2.username : player1.username);
    } else if (newBoard.every((cell) => cell)) {
      setWinner("Draw");
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
    setIsPlayerOneTurn(true);
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe-container">
      <CurrentPlayerPreview
        player1={player1}
        player2={player2}
        isPlayerOneTurn={isPlayerOneTurn} // Pass the turn state as a prop
      />
      <p className="status-message">
        {winner ? `Winner: ${winner}` : `${currentPlayer}'s turn`}
      </p>
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
      {winner && (
        <div>
          <Button variant="primary" onClick={resetGame} text="Play again" />
          <Button variant="secondary" onClick={onNextGame} text="Next Game" />
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
