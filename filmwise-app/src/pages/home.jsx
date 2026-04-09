import React from "react";
import Carrusel from "../components/Carrusel";
import GameList from "../components/GameList";
import Navbar from "../components/Navbar";

import topIcon from "../assets/notification_bell.svg";
import gameIcon from "../assets/movie.svg";

function Home() {
  return (
    <div className="min-h-screen bg-filmBlack text-white px-6 md:px-16 pt-24 pb-24">

      <Navbar />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          NUEVAS PELÍCULAS DISPONIBLES
        </h1>
        <button className="hover:opacity-70 transition">
          <img src={topIcon} alt="icono" className="w-6 md:w-8" />
        </button>
      </div>

      <Carrusel />

      <div className="flex justify-center mt-10">
        <button className="bg-filmGold text-black font-bold px-6 md:px-10 py-3 md:py-4 rounded-xl text-lg hover:bg-white hover:text-black transition">
          JUGAR PARTIDA ALEATORIA
        </button>
      </div>

      <div className="mt-14">
        <div className="inline-flex items-center gap-3 bg-filmGray text-white px-5 py-2 rounded-full font-semibold mb-4">
          <img src={gameIcon} alt="icono" className="w-5 md:w-6" />
          <span>PARTIDAS RECIENTES</span>
        </div>

        <GameList />
      </div>

    </div>
  );
}

export default Home;