import React, { useState, useEffect } from "react";
import Button from "../atoms/button";
import CurrentPlayerPreview from "../organisms/currentPlayerPreview";

const cards = ["🍎", "🍎", "🍌", "🍇", "", "🍇", "🍓", "🍓", "🍌"];
// const cards = ["🍎", "🍎"];

// Shuffle function to ensure the empty card remains at index 4
const shuffleArray = (array) => {
  const emptyCard = array[4];
  const shuffledArray = array.filter((_, index) => index !== 4); // Remove the empty card temporarily
  shuffledArray.sort(() => Math.random() - 0.5); // Shuffle the remaining cards
  shuffledArray.splice(4, 0, emptyCard); // Insert the empty card back at index 4
  return shuffledArray;
};

function Memory({ player1, player2, onNextGame, onLose }) {
  const [shuffledCards, setShuffledCards] = useState(shuffleArray([...cards])); // Include the empty card
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 }); // Track scores separately
  const [startingPlayer, setStartingPlayer] = useState(player1); // Track starting player

  // Handle game completion
  useEffect(() => {

    const declareResults = () => {
      if (scores.player1 > scores.player2) {
        setWinner(player1.username);
        setLoser(player2.username);
        onLose(player2.username); // Ensure this does not cause unintended state updates
      } else if (scores.player1 < scores.player2) {
        setWinner(player2.username);
        setLoser(player1.username);
        onLose(player1.username);
      } else {
        setWinner(null);
        setLoser(null);
      }
    };

    declareResults();
  }, [scores, player1.username, player2.username, onLose]);

  const handleCardClick = (index) => {
    if (
      index === 4 ||
      flippedCards.length >= 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(shuffledCards[index])
    ) {
      return; // Ignore clicks on the empty space, already flipped cards, or matched cards
    }

    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (shuffledCards[firstIndex] === shuffledCards[secondIndex]) {
        setMatchedCards((prev) => [
          ...prev,
          shuffledCards[firstIndex],
          shuffledCards[secondIndex],
        ]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
        setCurrentPlayer((current) =>
          current === player1 ? player2 : player1
        );
      }
    }
  }, [flippedCards, shuffledCards, player1, player2, currentPlayer]);

  const resetGame = () => {
    setShuffledCards(shuffleArray([...cards]));
    setFlippedCards([]);
    setMatchedCards([]);
    setWinner(null);
    setLoser(null); // Reset loser state
    setScores({ player1: 0, player2: 0 }); // Reset the scores
    setStartingPlayer((prev) => (prev === player1 ? player2 : player1)); // Alternate starting player
    setCurrentPlayer(startingPlayer); // Set the new starting player
  };

  return (
    <div className="memory-game-container">
      <h1>Memory Game</h1>
      <CurrentPlayerPreview
        player1={player1}
        player2={player2}
        isPlayerOneTurn={currentPlayer === player1} // Use currentPlayer to determine the turn
      />
      <p className="status-message">
        {winner && loser
          ? `${loser} drinks 5 sips!`
          : winner === "Draw"
          ? "It's a draw!"
          : "Loser drinks 5 sips"}
      </p>
      <div className="board">
        {shuffledCards.map((card, index) => (
          <div
            key={index}
            className={`card ${
              flippedCards.includes(index) || matchedCards.includes(card)
                ? "flipped"
                : ""
            } ${index === 4 ? "hole" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {flippedCards.includes(index) || matchedCards.includes(card)
              ? card
              : "❓"}
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

export default Memory;
