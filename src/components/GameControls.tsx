import React, { FC } from "react";

interface GameControlsProps {
  onStartGame: () => void;
  score: number;
  gameOver: boolean;
}

const GameControls: FC<GameControlsProps> = ({ onStartGame, score, gameOver }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Simon Game</h1>
      <button
        onClick={onStartGame}
        className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold mb-4 hover:bg-blue-700"
      >
        Start Game
      </button>
      <p className="text-lg mt-4">Score: {score}</p>
      {gameOver && (
        <p className="text-red-500 mt-2">Game Over! Click start to try again.</p>
      )}
    </>
  );
};

export default GameControls;

