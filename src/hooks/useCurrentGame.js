import { useState } from "react";
import BomberBoy from "../components/games/bomberBoy";
import TicTacToe from "../components/games/ticTacToe";
import WhereThatWhistle from "../components/games/whereThatWhistle";
import TipsyTurns from "../components/games/tipsyTurns";

const games = [
  { component: WhereThatWhistle, name: "WhereThatWhistle" },
  { component: TipsyTurns, name: "TipsyTurns" },
  { component: BomberBoy, name: "BomberBoy" },
  { component: TicTacToe, name: "TicTacToe" },
  // Add other games here
];

export function useCurrentGame() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const handleNextGame = () => {
    // Remove activePlayer flag from all players
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const updatedPlayers = players.map(player => ({
      ...player,
      activePlayer: false, // Set activePlayer to false for all players
    }));

    // Save the updated players array back to localStorage
    localStorage.setItem("players", JSON.stringify(updatedPlayers));

    // Move to the next game
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const CurrentGameComponent = games[currentGameIndex].component;

  return { CurrentGameComponent, handleNextGame };
}
