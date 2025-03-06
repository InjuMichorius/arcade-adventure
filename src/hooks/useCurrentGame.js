import { useState } from "react";
import BomberBoy from "../components/games/bomberBoy";
import TicTacToe from "../components/games/ticTacToe";
import WhereThatWhistle from "../components/games/whereThatWhistle";
import TipsyTurns from "../components/games/tipsyTurns";
import Draw from "../components/games/draw";
import emptyGame from "../components/games/emptyGame";

const games = [
  { component: emptyGame, name: "EmptyGame" },
  { component: TipsyTurns, name: "TipsyTurns" },
  { component: WhereThatWhistle, name: "WhereThatWhistle" },
  { component: BomberBoy, name: "BomberBoy" },
  { component: TicTacToe, name: "TicTacToe" },
  { component: TipsyTurns, name: "TipsyTurns" },
  { component: Draw, name: "Draw" },
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
