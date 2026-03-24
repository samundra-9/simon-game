import React, { FC } from "react";
import { COLORS, Color } from "../constants/game";

interface ColorGridProps {
  onColorClick: (color: Color) => void;
  disabled: boolean;
}

const ColorGrid: FC<ColorGridProps> = ({ onColorClick, disabled }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {COLORS.map((color) => (
        <button
          key={color}
          id={color}
          className={`w-24 h-24 rounded-lg transition-opacity ${color}-500 disabled:opacity-50`}
          style={{ backgroundColor: color }}
          onClick={() => onColorClick(color)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default ColorGrid;

