import React, { useState, useEffect } from "react";
import Button from "../atoms/button";
import Modal from "../atoms/modal";
import CurrentPlayerPreview from "../molecules/currentPlayerPreview";
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
  const [activePlayers, setActivePlayers] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loser, setLoser] = useState(null);
  const [bombIndex, setBombIndex] = useState(null);
  const [drinksMessage, setDrinksMessage] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);

  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    if (storedPlayers.length > 1) {
      const shuffledPlayers = [...storedPlayers].sort(() => Math.random() - 0.5);
      const selectedPlayers = shuffledPlayers.slice(0, 2);
      setPlayer1(selectedPlayers[0]);
      setPlayer2(selectedPlayers[1]);
      setActivePlayers(selectedPlayers);
    }
  }, []); // Initial setup of players
  
  const refreshActivePlayers = () => {
    const updatedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const active = updatedPlayers.filter((player) =>
      [player1?.id, player2?.id].includes(player.id)
    );
    setActivePlayers(active);
  };
  
  // Wrap `updateSips` to refresh `activePlayers`
  const handleUpdateSips = (username, sips) => {
    updateSips(username, sips);
    refreshActivePlayers(); // Refresh active players after updating sips
  };
  

  const handleChooseCard = (index) => {
    if (winner) return; // Exit if there is already a winner
    const newBoard = board.slice();

    // Only allow player 2 to choose cards during their turn
    if (!isPlayerOneTurn) {
      // Prevent choosing the same card again
      if (newBoard[index] === "chosen") return;

      // Check if the selected card is the bomb
      if (index === bombIndex) {
        const remainingCards =
          newBoard.filter((card) => card === null).length + 1;
        const saveCardAmount = 9 - remainingCards;

        // Update sips based on roles
        handleUpdateSips(player1.username, saveCardAmount);
        handleUpdateSips(player2.username, remainingCards);
        setDrinksMessage(
          `${player1.username} drinks ${saveCardAmount}, ${player2.username} drinks ${remainingCards}!`
        );

        // Declare winner and loser
        setLoser(player2.username); // Guesser loses
        setWinner(player1.username); // Bomber wins

        // Open drink modal
        setIsDrinkModalOpen(true);
      } else {
        // Card is safe, mark it as chosen
        newBoard[index] = "chosen";
        setBoard(newBoard);

        // Check if there's only one card left
        const remainingCards = newBoard.filter((card) => card === null).length;
        if (remainingCards === 1 && bombIndex !== null) {
          // Player 1 (bomber) drinks all 9 sips because only the bomb remains
          handleUpdateSips(player1.username, 9);
          setDrinksMessage(`${player1.username} drinks all 9!`);

          // Declare winner and loser
          setLoser(player1.username);
          setWinner(player2.username);

          // Open drink modal
          setIsDrinkModalOpen(true);
        }
      }

      // End player 2's turn and switch back to player 1
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
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

    // Shuffle players and select two random ones
    const shuffledPlayers = [...storedPlayers].sort(() => Math.random() - 0.5);
    const [newPlayer1, newPlayer2] = shuffledPlayers;

    // Update the active players
    const updatedPlayers = storedPlayers.map((player) => ({
      ...player,
      activePlayer: player.id === newPlayer1.id || player.id === newPlayer2.id,
    }));

    // Save the updated players back to localStorage
    localStorage.setItem("players", JSON.stringify(updatedPlayers));

    // Set the new players and reset the game state
    setPlayer1(newPlayer1);
    setPlayer2(newPlayer2);
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true); // Reset to Player 1's turn
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
      <CurrentPlayerPreview currentPlayers={activePlayers} />
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
            variant="pushable red"
            onClick={onNextGame}
            text="Next Game"
          />
        </div>
      )}
      {isPlayerOneTurn && bombIndex !== null && !winner && (
        <Button
          icon={faEyeSlash}
          variant="pushable red"
          onClick={handleNextPlayer}
          text="Hide bomb"
        />
      )}

      {isDrinkModalOpen && (
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
      )}

      {isInfoModalOpen && (
        <Modal
          title="How to Bomber Boy"
          description={`${player1.username} hides the bomb in one of the tiles. ${player2.username} then chooses a tile. If it's the bomb ${player2.username} drinks the same amount of sips as cards on the table. If the card is save, ${player1.username} drinks one sip and can choose where to put the bomb next.`}
          buttons={[
            {
              icon: faForward,
              text: "Skip",
              variant: "pushable green",
              onClick: onNextGame,
            },
            {
              icon: faGamepad,
              text: "Got it!",
              variant: "pushable red",
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
