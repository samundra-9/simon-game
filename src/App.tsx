import React, { useCallback, useState } from "react";
import ColorGrid from "./components/ColorGrid";
import GameControls from "./components/GameControls";
import HowToPlay from "./components/HowToPlay";
import { Color } from "./constants/game";
import { useGameLogic } from "./hooks/useGameLogic";
import { playColorSound, playSuccess, playError } from "./hooks/useSounds";

// Visual animation only (sound separate) - exact original timing
const playColorVisual = (color: Color): Promise<void> => {
  return new Promise((resolve) => {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add("opacity-50");
      setTimeout(() => {
        button.classList.remove("opacity-50");
        setTimeout(resolve, 500); // Exact original 500ms + 500ms
      }, 500);
    } else {
      resolve();
    }
  });
};

export default function App() {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const {
    sequence,
    isUserTurn,
    score,
    gameOver,
    startGame,
    handleUserClick,
    isPlaying,
  } = useGameLogic(playColorVisual, playSuccess, playError);

  const onColorClick = useCallback((color: Color) => {
    playColorSound(color);
    handleUserClick(color);
  }, [handleUserClick]);

  const disabled = gameOver || !isUserTurn || isPlaying;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
      <GameControls
        onStartGame={startGame}
        score={score}
        gameOver={gameOver}
        onHowToPlay={() => setShowHowToPlay(true)}
      />
      <ColorGrid
        onColorClick={onColorClick}
        disabled={disabled}
      />
      <HowToPlay 
        isOpen={showHowToPlay} 
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
}

