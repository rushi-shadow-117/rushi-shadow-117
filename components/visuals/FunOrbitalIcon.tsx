import React from "react";

export function FunOrbitalIcon() {
  // 3 fun interests evenly spaced at 120-degree intervals (0, 120, 240)
  const interests = [
    { name: "F1", angle: 0, bg: "bg-black", text: "text-white", border: "" },
    { name: "Comics", angle: 120, bg: "bg-white", text: "text-black", border: "border border-black" },
    { name: "Games", angle: 240, bg: "bg-white", text: "text-black", border: "border border-black" },
  ];

  // Calculate position using trigonometry
  const getPosition = (angle: number, radius: number = 40) => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.sin(rad) * radius;
    const y = -Math.cos(rad) * radius; // Negative because Y increases downward
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
      {/* Outer Ring */}
      <div className="absolute inset-0 border border-black/20 rounded-full animate-rotate-orbit"></div>
      {/* Inner Dashed Ring */}
      <div className="absolute inset-4 border border-dashed border-black/40 rounded-full animate-rotate-orbit-reverse"></div>

      {/* Rotating Interests Container */}
      <div className="absolute inset-0 animate-rotate-orbit">
        {interests.map((interest, index) => {
          const pos = getPosition(interest.angle);
          return (
            <div
              key={index}
              className={`absolute w-auto min-w-[3.5rem] px-2 h-8 ${interest.bg} ${interest.text} ${interest.border} flex items-center justify-center text-[10px] font-mono font-bold animate-rotate-orbit-reverse shadow-lg whitespace-nowrap`}
              style={{
                left: `calc(50% + ${pos.x})`,
                top: `calc(50% + ${pos.y})`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {interest.name}
            </div>
          );
        })}
      </div>

      {/* Center Point */}
      <div className="absolute inset-0 m-auto w-2 h-2 bg-black rounded-full"></div>
    </div>
  );
}

