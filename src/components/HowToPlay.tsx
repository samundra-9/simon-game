import React, { FC, useEffect } from "react";
import { COLORS } from "../constants/game";

interface HowToPlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlay: FC<HowToPlayProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">🎮 How to Play Simon</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl p-2 -m-2 rounded-lg hover:bg-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6 text-gray-200">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-400">Rules</h3>
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li>Watch & remember the color sequence</li>
              <li>Click the same sequence using colored buttons</li>
              <li>Sequence gets longer each round</li>
              <li>No consecutive duplicate colors</li>
              <li>Score = current sequence length</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-400">Controls</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-green-500"></div>
                  <span>Green</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-red-500"></div>
                  <span>Red</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-yellow-500"></div>
                  <span>Yellow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-500"></div>
                  <span>Blue</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-600">
            <p className="text-xs text-gray-400 mb-3">Press ESC or click outside to close</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;

