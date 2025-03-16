import { useState } from "react";
import BomberBoy from "../components/games/bomberBoy";
import TicTacToe from "../components/games/ticTacToe";
import WhereThatWhistle from "../components/games/whereThatWhistle";
import TipsyTurns from "../components/games/tipsyTurns";
import Draw from "../components/games/draw";
// import emptyGame from "../components/games/emptyGame";

const games = [
  { component: WhereThatWhistle, name: "WhereThatWhistle" },
  { component: TipsyTurns, name: "TipsyTurns" },
  { component: TicTacToe, name: "TicTacToe" },
  { component: BomberBoy, name: "BomberBoy" },
  { component: Draw, name: "Draw" },
  // { component: emptyGame, name: "EmptyGame" },
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
