import { useState } from "react";
import BomberBoy from "../components/games/bomberBoy";
import TicTacToe from "../components/games/ticTacToe";

const games = [
  { component: BomberBoy, name: "BomberBoy" },
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