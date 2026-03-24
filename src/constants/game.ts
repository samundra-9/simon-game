export const COLORS = ["green", "red", "yellow", "blue"] as const;
export type Color = (typeof COLORS)[number];

