import greenSound from "../sounds/green.wav";
import redSound from "../sounds/red.wav";
import yellowSound from "../sounds/yellow.wav";
import blueSound from "../sounds/blue.wav";
import successSound from "../sounds/success.wav";
import errorSound from "../sounds/error.wav";
import { Color } from "../constants/game";

export const soundsMap = {
  green: new Audio(greenSound),
  red: new Audio(redSound),
  yellow: new Audio(yellowSound),
  blue: new Audio(blueSound),
  success: new Audio(successSound),
  error: new Audio(errorSound),
} as const;

export type SoundKey = keyof typeof soundsMap;

export const playSound = (soundKey: SoundKey) => {
  soundsMap[soundKey].play();
};

export const playColorSound = (color: Color) => playSound(color as SoundKey);
export const playSuccess = () => playSound("success");
export const playError = () => playSound("error");

