import { useState } from "react";
import TicTacToe from "../components/games/ticTacToe";

const games = [
  { component: TicTacToe, name: "TicTacToe" },
  // Add other games here
];

export function useCurrentGame() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const CurrentGameComponent = games[currentGameIndex].component;

  return { CurrentGameComponent, handleNextGame };
}