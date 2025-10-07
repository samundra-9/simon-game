
import { useState, useEffect } from "react";
import blueSound from "./sounds/blue.wav";
import redSound from "./sounds/red.wav";
import greenSound from "./sounds/green.wav";
import yellowSound from "./sounds/yellow.wav";
import successSound from "./sounds/success.wav";
import errorSound from "./sounds/error.wav";

// Sound mapping
const sounds: { [key: string]: HTMLAudioElement } = {
  green: new Audio(greenSound),
  red: new Audio(redSound),
  yellow: new Audio(yellowSound),
  blue: new Audio(blueSound),
  success: new Audio(successSound),
  error: new Audio(errorSound),
};

// Colors available
const colors = ["green", "red", "yellow", "blue"];

export default function App() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Function to play a color's sound and flash the button
  const playColor = (color: string) => {
    return new Promise<void>((resolve) => {
      sounds[color].play();
      const button = document.getElementById(color);
      if (button) {
        button.classList.add("opacity-50");
        setTimeout(() => {
          button.classList.remove("opacity-50");
          setTimeout(resolve, 500); // Ensures timing separation
        }, 500);
      } else {
        resolve();
      }
    });
  };

  // Start the game
  const startGame = () => {
    setSequence([]);
    setUserInput([]);
    setScore(0);
    setGameOver(false);
    addNewColor([]);
  };

  // Function to generate a new color ensuring no consecutive duplicates
  const addNewColor = (prevSequence: string[]) => {
    setIsUserTurn(false);
  
    const newSequence: string[] = [];
    let prevColor: string | null = null;
  
    for (let i = 0; i < prevSequence.length + 1; i++) {
      let newColor;
      do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
      } while (newColor === prevColor); // Prevent consecutive duplicates
  
      newSequence.push(newColor);
      prevColor = newColor; // Update last used color
    }
  
    setSequence(newSequence);
  };
  

  // Play the sequence with delays to avoid merging effects
  useEffect(() => {
    if (sequence.length > 0) {
      (async () => {
        setIsUserTurn(false);
        for (let i = 0; i < sequence.length; i++) {
          await playColor(sequence[i]); // Ensures proper blinking and sound
        }
        setTimeout(() => setIsUserTurn(true), 1000);
      })();
    }
  }, [sequence]);

  // Handle user input
  const handleUserClick = (color: string) => {
    if (!isUserTurn || gameOver) return;

    const newInput = [...userInput, color];
    setUserInput(newInput);
    playColor(color);

    // Check if the user pressed the correct color
    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      sounds.error.play();
      setGameOver(true);
      return;
    }

    // If the user completed the sequence correctly
    if (newInput.length === sequence.length) {
      setTimeout(() => {
        sounds.success.play();
        setScore(sequence.length);
        setUserInput([]);
        addNewColor(sequence);
      }, 1100);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Simon Game</h1>
      <button
        onClick={startGame}
        className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold mb-4"
      >
        Start Game
      </button>
      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <button
            key={color}
            id={color}
            className={`w-24 h-24 rounded-lg transition-opacity ${color}-500`}
            style={{ backgroundColor: color }}
            onClick={() => handleUserClick(color)}
          ></button>
        ))}
      </div>
      <p className="mt-4 text-lg">Score: {score}</p>
      {gameOver && <p className="text-red-500 mt-2">Game Over! Click start to try again.</p>}
    </div>
  );
}
