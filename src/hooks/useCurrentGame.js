import { useState } from "react";
import GridGamble from "../components/games/gridGamble";
import TicTacToe from "../components/games/ticTacToe";

const games = [
  { component: GridGamble, name: "GridGamble" },
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