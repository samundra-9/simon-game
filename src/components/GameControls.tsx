import React, { FC } from "react";

interface GameControlsProps {
  onStartGame: () => void;
  score: number;
  gameOver: boolean;
  onHowToPlay: () => void;
}

const GameControls: FC<GameControlsProps> = ({ onStartGame, score, gameOver, onHowToPlay }) => {
  return (
    <>

      <h1 className="text-3xl font-bold mb-4">Simon Game</h1>
      <div className="flex gap-3 mb-4">
        <button
          onClick={onStartGame}
          className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
        >
          Start Game
        </button>
        <button
          onClick={onHowToPlay}
          className="px-6 py-2 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700"
          title="How to Play"
        >
          ?
        </button>
      </div>

      <p className="text-lg mt-4">Score: {score}</p>
      {gameOver && (
        <p className="text-red-500 mt-2">Game Over! Click start to try again.</p>
      )}
    </>
  );
};

export default GameControls;

