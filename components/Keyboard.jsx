import React from "react";

const keyLayout = [
  ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "="],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "Menu"]
];

const glowingKeys = ["Ctrl", "B"];

export default function VirtualKeyboard() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="grid grid-cols-14 gap-2">
        {keyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 col-span-14">
            {row.map((key) => (
              <div
                key={key}
                className={`
                  text-white text-sm w-12 h-12
                  flex items-center justify-center
                  rounded-md bg-[#1a1a1a]
                  font-mono transition-all duration-200
                  ${glowingKeys.includes(key)
                    ? "text-yellow-400 shadow-[0_0_12px_4px_rgba(255,255,0,0.5)]"
                    : "text-gray-300"}
                `}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 
