import  { useCallback } from "react";
import { Color } from "./constants/game";
import greenSound from "./sounds/green.wav";
import redSound from "./sounds/red.wav";
import yellowSound from "./sounds/yellow.wav";
import blueSound from "./sounds/blue.wav";
import successSound from "./sounds/success.wav";
import errorSound from "./sounds/error.wav";

const sounds = {
  green: new Audio(greenSound),
  red: new Audio(redSound),
  yellow: new Audio(yellowSound),
  blue: new Audio(blueSound),
  success: new Audio(successSound),
  error: new Audio(errorSound),
};

import ColorGrid from "./components/ColorGrid";
import GameControls from "./components/GameControls";
import { useGameLogic } from "./hooks/useGameLogic";

const playColorSound = (color: Color) => sounds[color].play();
const playSuccess = () => sounds.success.play();
const playError = () => sounds.error.play();

const playColorVisual = (color: Color): Promise<void> => {
  return new Promise((resolve) => {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add("opacity-50");
      setTimeout(() => {
        button.classList.remove("opacity-50");
        setTimeout(resolve, 500);
      }, 500);
    } else {
      resolve();
    }
  });
};

export default function App() {
  const {
    isUserTurn,
    score,
    gameOver,
    startGame,
    handleUserClick,
    isPlaying,
  } = useGameLogic(playColorSound, playColorVisual, playSuccess, playError);

  const onColorClick = useCallback((color: Color) => {
    playColorSound(color);
    handleUserClick(color);
  }, [handleUserClick]);

  const disabled = gameOver || !isUserTurn || isPlaying;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <GameControls
        onStartGame={startGame}
        score={score}
        gameOver={gameOver}
      />
      <ColorGrid
        onColorClick={onColorClick}
        disabled={disabled}
      />
    </div>
  );
}

