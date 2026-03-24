// Shared game constants - extracted from App.tsx
export const COLORS = ["green", "red", "yellow", "blue"] as const;
export type Color = (typeof COLORS)[number];

export const createSoundsMap = () => ({
  green: new Audio("/src/sounds/green.wav"),
  red: new Audio("/src/sounds/red.wav"),
  yellow: new Audio("/src/sounds/yellow.wav"),
  blue: new Audio("/src/sounds/blue.wav"),
  success: new Audio("/src/sounds/success.wav"),
  error: new Audio("/src/sounds/error.wav"),
} as const);

export type SoundKey = keyof ReturnType<typeof createSoundsMap>;

