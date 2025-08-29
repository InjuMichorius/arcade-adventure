import React, { useEffect, useState, useContext } from "react";
import HowToPlay from "../atoms/howToPlay";
import {
  faWhiskeyGlass,
  faForward,
  faGamepad,
  faRepeat,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import GameInstructions from "../molecules/gameInstructions";
import { PlayerDataContext } from "../../providers/playerDataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarPreview from "../atoms/avatarPreview";
import DrinkUp from "../atoms/drinkUp";

function TicTacToe({ onNextGame }) {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [drinksMessage, setDrinksMessage] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);
  const [isDrinkUpScreen, setIsDrinkUpScreen] = useState(false);
  const { players, updateSips, loading } = useContext(PlayerDataContext);
  // eslint-disable-next-line no-unused-vars
  const [loser, setLoser] = useState(null);

  useEffect(() => {
    if (!loading && players.length > 1) {
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      setPlayer1(shuffledPlayers[0]);
      setPlayer2(shuffledPlayers[1]);
    }
  }, [players, loading]);

  if (loading || players.length === 0) {
    return <div>Loading players...</div>;
  }

  const currentSymbol = isPlayerOneTurn ? "cross" : "circle";

  const handleClick = (index) => {
    // Prevent further moves if the cell is already occupied or if there's a winner
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentSymbol;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      const winningPlayer =
        gameWinner === "cross" ? player1 : player2;
      const losingPlayer =
        gameWinner === "cross" ? player2 : player1;

      setWinner(winningPlayer);
      setLoser(losingPlayer); // Set the loser state
      setDrinksMessage(`${losingPlayer.username} drinks 10`);
      setIsDrinkUpScreen(true);

      // Update the losing player's points
      updateSips(losingPlayer.username, 10);
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
    if (players.length > 1) {
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      setPlayer1(shuffledPlayers[0]);
      setPlayer2(shuffledPlayers[1]);
    }
    setIsDrinkUpScreen(false);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setLoser(null);
  };

  return (
    <div className="tic-tac-toe-container">
      <button className="hint" onClick={() => setIsInfoModalOpen(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <h1>Tic Tac Toe</h1>
      <div className="current-player-preview">
        <div className="current-player-preview__wrapper">
          <AvatarPreview
            width={100}
            image={player1?.avatar}
            points={player1?.points}
          />
          {player1?.username}
        </div>
        vs
        <div className="current-player-preview__wrapper">
          <AvatarPreview
            width={100}
            image={player2?.avatar}
            points={player2?.points}
          />
          {player2?.username}
        </div>
      </div>
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
      {isDrinkUpScreen && (
        <DrinkUp
          drinkMessage={drinksMessage}
          playersToDrink={[loser]}
          drinkAmount={10}
          onPlayAgain={resetGame}
          onNextGame={onNextGame}
        />
      )}
      {isInfoModalOpen && (
        <HowToPlay
          title="Tic Tac Toe"
          description={
            <GameInstructions
              steps={[
                {
                  avatar: player1?.avatar,
                  name: player1?.username,
                  text: (
                    <>
                      <strong>
                        {player1?.username ? player1.username : "Someone"}
                      </strong>{" "}
                      chooses a tile for their <strong>X</strong>
                    </>
                  ),
                },
                {
                  avatar: player2?.avatar,
                  name: player2?.username,
                  text: (
                    <>
                      <strong>
                        {player2?.username ? player2.username : "Someone"}
                      </strong>{" "}
                      chooses a tile for their <strong>O</strong>
                    </>
                  ),
                },
                {
                  icon: faRepeat,
                  text: (
                    <>
                      Repeat until <strong>X</strong> or <strong>O</strong> has
                      three in a row
                    </>
                  ),
                },
                {
                  icon: faWhiskeyGlass,
                  text: (
                    <>
                      Loser drinks <strong>10</strong> sips
                    </>
                  ),
                },
              ]}
            />
          }
          buttons={[
            {
              icon: faForward,
              text: "Skip game",
              variant: "secondary",
              onClick: onNextGame,
              dataTestId: "skip-game-button",
            },
            {
              icon: faGamepad,
              text: "Play game",
              variant: "pushable red",
              onClick: () => setIsInfoModalOpen(false), // Close modal on button click
              dataTestId: "play-game-button",
            },
          ]}
          onClose={() => setIsInfoModalOpen(false)} // Close modal when overlay or close button is clicked
        />
      )}
    </div>
  );
}

export default TicTacToe;
