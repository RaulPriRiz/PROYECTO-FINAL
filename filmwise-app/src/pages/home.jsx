import Carrusel from "../components/Carrusel";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getFilms, getNewFilms } from "../data/filmApi";
import bell from "../assets/notification_bell.svg";
import dice from "../assets/dice.svg";
import gameIcon from "../assets/movie.svg";
import { getRecentGames } from "../data/gameApi";
import GameCard from "../components/GameCard";
import { Link } from "react-router";


function Home() {

  const [newFilms, setNewFilms] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [movies, setMovies] = useState([]);
  
  const userLogin = JSON.parse(localStorage.getItem("user"));

  const randomMovieTitle = movies[Math.floor(Math.random() * movies.length)]?.title;

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const data = await getNewFilms();
        console.log("NEW MOVIES:", data);
        setNewFilms(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchNewFilms();

    const fetchGames = async () => {
      try {
        const data = await getRecentGames(userLogin.name);
        console.log("RECENT GAMES:", data);
        setRecentGames(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchGames();

    const fetchFilms = async () => {
        try {
          const data = await getFilms();
          console.log("MOVIES:", data);
          setMovies(data);
        } catch (error) {
          console.log(error.message);
        }
      };
  
      fetchFilms();
  }, []);

  return (
    <div className="min-h-screen bg-filmBlack text-white px-6 md:px-16 pt-24 pb-24">

      <Navbar />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          NUEVAS PELÍCULAS DISPONIBLES
        </h1>
        <button className="hover:opacity-70 transition">
          <img src={bell} alt="icono" className="w-6 md:w-8" />
        </button>
      </div>

      <Carrusel movies={newFilms} />

      <div className="flex justify-center mt-10">
        <Link to={`/details/${randomMovieTitle}`} className="flex items-center gap-3 bg-filmGold text-black font-serif font-bold px-6 md:px-7 py-3 md:py-4 rounded-xl text-lg hover:bg-white hover:text-black transition">
          <img src={dice} alt="icono" className="w-6 md:w-8" />

          <span>JUGAR PELÍCULA ALEATORIA</span>
        </Link>
      </div>

      <div className="mt-14">
        <div className="inline-flex items-center gap-3 bg-filmGray text-white px-5 py-2 rounded-full font-semibold mb-4">
          <img src={gameIcon} alt="icono" className="w-5 md:w-6" />
          <span>PARTIDAS RECIENTES</span>
        </div>

        <div className="flex gap-6 mt-4 flex-wrap">
          {recentGames.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              mode={game.mode}
              image={game.image}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

export default Home;