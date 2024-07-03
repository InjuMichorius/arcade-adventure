import React, { useState } from "react";
import Button from "../molecules/button";

function TicTacToe({ player1, player2 }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const currentPlayer = isPlayerOneTurn ? player1.name : player2.name;
  const currentSymbol = isPlayerOneTurn ? "cross" : "circle";

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentSymbol;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner === "cross" ? player1.name : player2.name);
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
      <h1>Tic Tac Toe</h1>
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
            {cell && (
              <div className={cell}></div>
            )}
          </div>
        ))}
      </div>
      {winner && (
        <Button variant="primary" onClick={resetGame} text="Play again" />
      )}
    </div>
  );
}

export default TicTacToe;
