import React from "react";
import Carrusel from "../components/Carrusel";
import GameList from "../components/GameList";
import { Link } from "react-router-dom";

import topIcon from "../assets/notification_bell.svg";
import gameIcon from "../assets/movie.svg";

function Home() {

  return (
    <div className="min-h-screen bg-filmBlack text-white px-16 py-10">

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">
          NUEVAS PELÍCULAS DISPONIBLES
        </h1>
        <button className="hover:opacity-70 transition">
          <img src={topIcon} alt="icono" className="w-8 h-8" />
        </button>
      </div>

      <Carrusel />

      <div className="flex justify-center mt-10">
        <button className="bg-filmGold text-black font-bold px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-black transition">
          JUGAR PARTIDA ALEATORIA
        </button>
      </div>

      <div className="mt-14">
        <div className="inline-flex items-center gap-3 bg-stone-600 text-white px-5 py-2 rounded-full font-semibold mb-4">
          <img src={gameIcon} alt="icono" className="w-6 h-6" />
          <span>PARTIDAS RECIENTES</span>
        </div>

        <GameList />

      </div>

    </div>
  );
}

export default Home;