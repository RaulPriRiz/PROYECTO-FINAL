import React from "react";

function GameCard({ title, mode, image }) {
  return (
    <div
      className="w-56 h-32 rounded-xl p-4 flex flex-col justify-end text-white bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-sm">{mode}</p>
      </div>
    </div>
  );
}

export default GameCard;