import React from "react";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0 opacity-[0.08] pointer-events-none select-none overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-100 450 C 200 100, 600 800, 1500 200"
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          d="M-100 550 C 300 200, 700 900, 1500 300"
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          d="M-100 650 C 400 300, 800 1000, 1500 400"
          stroke="black"
          strokeWidth="1.5"
        />
        <circle
          cx="720"
          cy="450"
          r="300"
          stroke="black"
          strokeWidth="1"
          strokeDasharray="8 8"
          className="opacity-50"
        />
      </svg>
    </div>
  );
}