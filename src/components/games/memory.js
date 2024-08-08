import React, { useState, useEffect } from "react";
import Button from "../atoms/button";
import CurrentPlayerPreview from "../organisms/currentPlayerPreview";

const cards = ["🍎", "🍎", "🍌", "🍇", "", "🍇", "🍓", "🍓", "🍌"];

// Shuffle function to ensure the empty card remains at index 4
const shuffleArray = (array) => {
  const emptyCard = array[4];
  const shuffledArray = array.filter((_, index) => index !== 4); // Remove the empty card temporarily
  shuffledArray.sort(() => Math.random() - 0.5); // Shuffle the remaining cards
  shuffledArray.splice(4, 0, emptyCard); // Insert the empty card back at index 4
  return shuffledArray;
};

function Memory({ player1, player2, onNextGame }) {
  const [shuffledCards, setShuffledCards] = useState(shuffleArray([...cards])); // Include the empty card
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 }); // Track scores separately

  // Determine winner and loser when all matches are found
  useEffect(() => {
    if (matchedCards.length === cards.filter((card) => card !== "").length) {
      if (scores.player1 > scores.player2) {
        setWinner(player1.username);
        setLoser(player2.username);
      } else if (scores.player1 < scores.player2) {
        setWinner(player2.username);
        setLoser(player1.username);
      } else {
        setWinner("Draw");
        setLoser(null);
      }
    }
  }, [matchedCards, scores, player1, player2]);

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
        const currentUsername = currentPlayer.username;

        // Update the scores based on the current player
        setScores((prevScores) => {
          const updatedScores = {
            ...prevScores,
            [currentPlayer === player1 ? "player1" : "player2"]:
              prevScores[currentPlayer === player1 ? "player1" : "player2"] + 1,
          };

          // Update the players in local storage with new scores
          const updatedPlayers = JSON.parse(
            localStorage.getItem("players")
          ).map((player) =>
            player.username === currentUsername
              ? { ...player, points: player.points + 100 }
              : player
          );

          localStorage.setItem("players", JSON.stringify(updatedPlayers));

          return updatedScores;
        });
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
        setCurrentPlayer((current) =>
          current === player1 ? player2 : player1
        );
      }
    }
  }, [
    flippedCards,
    shuffledCards,
    matchedCards,
    player1,
    player2,
    currentPlayer,
  ]);

  const resetGame = () => {
    setShuffledCards(shuffleArray([...cards]));
    setFlippedCards([]);
    setMatchedCards([]);
    setWinner(null);
    setLoser(null); // Reset loser state
    setCurrentPlayer(player1); // Reset to player1's turn
    setScores({ player1: 0, player2: 0 }); // Reset the scores
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
          : ""}
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
      {winner || matchedCards.length === cards.filter((card) => card !== "").length ? (
        <div>
          <Button variant="primary" onClick={resetGame} text="Play again" />
          <Button variant="secondary" onClick={onNextGame} text="Next Game" />
        </div>
      ) : null}
    </div>
  );
}

export default Memory;
