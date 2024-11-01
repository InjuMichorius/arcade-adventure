import React, { useState } from "react";
import Button from "../atoms/button";
import CurrentPlayerPreview from "../organisms/currentPlayerPreview";

function GridGamble({ player1, player2, onNextGame }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [bombIndex, setBombIndex] = useState(null);
  const [drinksMessage, setDrinksMessage] = useState(null); // To store drinks message

  const handleChooseCard = (index) => {
    if (winner) return;

    const newBoard = board.slice();
    console.log("bombIndex", bombIndex, "index", index);

    // Only Player 2 can choose cards
    if (!isPlayerOneTurn) {
      // Check if the selected cell is already chosen
      if (newBoard[index] === "chosen") {
        return; // Prevent selection of already chosen cards
      }

      // Check if player 2 chose the bomb
      if (index === bombIndex) {
        console.log("Player 2 clicked the bomb!"); // Log bomb click
        // Player 2 drinks all remaining cards
        const remainingCards = newBoard.filter(card => card === null).length - 1; // Remaining cards to drink
        setDrinksMessage(`${player2.username} drinks ${remainingCards}!`);
        setLoser(player2.username); // Player 2 loses
        setWinner(player1.username); // Player 1 wins
      } else {
        console.log("Player 2 chose a safe card."); // Log safe card choice
        // Mark card as chosen (disappear it)
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
        player1={player1}
        player2={player2}
        isPlayerOneTurn={isPlayerOneTurn}
      />
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell === "bomb" ? "bomb" : cell === "chosen" ? "chosen" : ""}`}
            onClick={() => {
              console.log("Clicked cell index:", index); // Log every click
              if (isPlayerOneTurn) {
                // Player 1 chooses where to place the bomb
                if (cell === null) handleSetBomb(index);
              } else {
                console.log("Player 2 is trying to choose card at index:", index);
                handleChooseCard(index); // Player 2 can click the bomb or other cells
              }
            }}
          >
            {/* Only show the bomb if it's Player 1's turn and the bomb has been set */}
            {cell === "bomb" && isPlayerOneTurn ? "💣" : cell === "chosen" ? "✔️" : ""}
          </div>
        ))}
      </div>

      {winner ? (
        <div>
          <h2>{winner} wins! {drinksMessage}</h2>
          <Button variant="primary" onClick={resetGame} text="Play again" />
          <Button variant="secondary" onClick={onNextGame} text="Next Game" />
        </div>
      ) : (
        <Button variant="primary" onClick={handleNextPlayer} text="Next Player" />
      )}
    </div>
  );
}

export default GridGamble;
