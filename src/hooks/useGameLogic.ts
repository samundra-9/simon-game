import { useState, useEffect, useCallback } from "react";
import { COLORS, Color } from "../constants/game";

interface GameLogicReturn {
  sequence: Color[];
  userInput: Color[];
  isUserTurn: boolean;
  score: number;
  gameOver: boolean;
  startGame: () => void;
  handleUserClick: (color: Color) => void;
  isPlaying: boolean;
}

import { playColorSound } from "./useSounds";

export const useGameLogic = (
  playColorVisual: (color: Color) => Promise<void>,
  playSuccess: () => void,
  playError: () => void
): GameLogicReturn => {
  const [sequence, setSequence] = useState<Color[]>([]);
  const [userInput, setUserInput] = useState<Color[]>([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

const playColorInternal = useCallback(async (color: Color) => {
    playColorSound(color);
    const button = document.getElementById(color);
    if (button) {
      button.classList.add("opacity-50");
      setTimeout(() => {
        button.classList.remove("opacity-50");
      }, 500);
    }
    await playColorVisual(color);
  }, [playColorVisual]);

  const startGame = useCallback(() => {
    setSequence([]);
    setUserInput([]);
    setScore(0);
    setGameOver(false);
    addNewColor([]);
  }, []);

  const addNewColor = useCallback((prevSequence: Color[]) => {
    setIsUserTurn(false);

    const newSequence: Color[] = [];
    let prevColor: Color | null = null;

    for (let i = 0; i < prevSequence.length + 1; i++) {
      let newColor: Color;
      do {
        newColor = COLORS[Math.floor(Math.random() * COLORS.length)] as Color;
      } while (newColor === prevColor);

      newSequence.push(newColor);
      prevColor = newColor;
    }

    setSequence(newSequence);
  }, []);

  useEffect(() => {
    if (sequence.length > 0) {
      (async () => {
        setIsUserTurn(false);
        for (let i = 0; i < sequence.length; i++) {
          await playColorInternal(sequence[i]);
        }
        setTimeout(() => setIsUserTurn(true), 1000);
      })();
    }
  }, [sequence, playColorInternal]);

  const handleUserClick = useCallback((color: Color) => {
    if (!isUserTurn || gameOver) return;

    const newInput = [...userInput, color];
    setUserInput(newInput);
    playColorInternal(color);

    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      playError();
      setGameOver(true);
      return;
    }

    if (newInput.length === sequence.length) {
      playSuccess();
      setTimeout(() => {
        setScore(sequence.length);
        setUserInput([]);
        addNewColor(sequence);
      }, 1100);
    }
  }, [isUserTurn, gameOver, userInput, sequence, playColorInternal, playError, playSuccess, addNewColor]);

  const isPlaying = !isUserTurn && sequence.length > 0;

  return {
    sequence,
    userInput,
    isUserTurn,
    score,
    gameOver,
    startGame,
    handleUserClick,
    isPlaying,
  };
};

