import React, { useState, useEffect } from "react";
import Button from "../atoms/button";
import CurrentPlayerPreview from "../organisms/currentPlayerPreview";

const cards = ["🍎", "🍎", "🍌", "🍇", "🍇", "🍓", "🍓", "🍌", ""];

const shuffleArray = (array) => {
  const emptyCard = array[8];
  const shuffledArray = array.slice(0, 8).sort(() => Math.random() - 0.5);
  shuffledArray.push(emptyCard);
  return shuffledArray;
};

function Memory({ player1, player2, onNextGame, onLose }) {
  const [shuffledCards, setShuffledCards] = useState(shuffleArray([...cards]));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({
    [player1.username]: 0,
    [player2.username]: 0,
  });

  useEffect(() => {
    if (matchedCards.length === 8) {
      let newWinner;
      if (scores[player1.username] > scores[player2.username]) {
        newWinner = player1.username;
        onLose(player2.username);
      } else if (scores[player1.username] < scores[player2.username]) {
        newWinner = player2.username;
        onLose(player1.username);
      } else {
        newWinner = "Draw";
      }
      setWinner(newWinner);
    }
  }, [matchedCards, scores, player1.username, player2.username, onLose]);

  const handleCardClick = (index) => {
    if (
      flippedCards.length >= 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(shuffledCards[index]) ||
      shuffledCards[index] === ""
    ) {
      return;
    }

    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      const firstIndex = flippedCards[0];
      const secondIndex = index;

      if (shuffledCards[firstIndex] === shuffledCards[secondIndex]) {
        setMatchedCards((prev) => [
          ...prev,
          shuffledCards[firstIndex],
          shuffledCards[secondIndex],
        ]);
        setScores((prevScores) => ({
          ...prevScores,
          [currentPlayer.username]: prevScores[currentPlayer.username] + 1,
        }));
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setCurrentPlayer((prev) => (prev === player1 ? player2 : player1));
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setShuffledCards(shuffleArray([...cards]));
    setFlippedCards([]);
    setMatchedCards([]);
    setWinner(null);
    setScores({ [player1.username]: 0, [player2.username]: 0 });
    setCurrentPlayer(player1);
  };

  return (
    <div className="memory-game-container">
      <h1>Memory Game</h1>
      <CurrentPlayerPreview
        player1={player1}
        player2={player2}
        isPlayerOneTurn={currentPlayer === player1}
      />
      <p className="status-message">
        {winner
          ? winner === "Draw"
            ? "It's a draw!"
            : `${winner} wins! ${winner === player1.username ? player2.username : player1.username} drinks 5 sips!`
          : `${currentPlayer.username}'s turn`}
      </p>
      <div className="board">
        {shuffledCards.map((card, index) => (
          <div
            key={index}
            className={`card ${
              flippedCards.includes(index) || matchedCards.includes(card)
                ? "flipped"
                : ""
            } ${card === "" ? "hole" : ""}`}
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
