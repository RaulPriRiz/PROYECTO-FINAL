import { useEffect, useState } from "react";
import { getMoviesByTitle } from "../data/filmApi";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import playIcon from "../assets/play_circle.svg";
import starIcon from "../assets/star.svg";
import groupIcon from "../assets/group.svg";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const GENRES = {
  28: "Acción", 12: "Aventura", 16: "Animación", 35: "Comedia",
  80: "Crimen", 99: "Documental", 18: "Drama", 10751: "Familia",
  14: "Fantasía", 36: "Historia", 27: "Terror", 10402: "Música",
  9648: "Misterio", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV", 53: "Thriller", 10752: "Guerra", 37: "Western"
};

const MovieDetails = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMoviesByTitle(title);
        setMovie(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, []);

  if (!movie) return <div className="text-white p-4">Cargando...</div>;

  const genres = movie.genre_ids?.map(id => GENRES[id]).join(" • ");

  return (
    <div className="bg-filmBlack text-white min-h-screen flex flex-col">

      <div className="relative w-full h-[200px] md:h-[89vh]">
        <img
          src={`${IMAGE_BASE}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
        />

        <div className="hidden md:flex absolute inset-0 bg-black/70 px-20 py-12 gap-16 items-center">

          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt="poster"
            className="w-96 rounded-2xl shadow-2xl"
          />

          <div className="flex flex-col justify-center max-w-3xl">

            <h1 className="text-6xl font-bold mb-6">{movie.title}</h1>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {movie.overview}
            </p>

            <div className="flex gap-10 mb-4 text-lg">

              <span>{movie.release_date}</span>

              <div className="flex items-center gap-2">
                <img src={starIcon} className="w-6" />
                {movie.vote_average}
              </div>

              <div className="flex items-center gap-2">
                <img src={groupIcon} className="w-6" />
                {movie.popularity}
              </div>

            </div>

            <p className="text-md text-gray-400 mb-8">{genres}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:hidden flex flex-col justify-between">

        <div>
          <h1 className="text-xl font-bold text-center mb-2">
            {movie.title}
          </h1>

          <div className="flex justify-center gap-4 text-sm mb-3">
            <span>{movie.release_date}</span>

            <div className="flex items-center gap-1">
              <img src={starIcon} className="w-4" />
              {movie.vote_average}
            </div>

            <div className="flex items-center gap-1">
              <img src={groupIcon} className="w-4" />
              {movie.popularity}
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mb-3">
            {genres}
          </p>

          <p className="text-sm text-gray-300 text-center">
            {movie.overview}
          </p>

          {/* POSTER EN MOVIL */}
          <div className="flex justify-center my-4">
            <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt="poster"
              className=" mt-10 w-44 rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div>
          <div className="flex gap-3 mb-4">
            <Link to={`/game/${title}`}>
              <button
                className="flex-1 bg-filmRed py-2 rounded flex items-center justify-center gap-2"
              >
                <img src={playIcon} className="w-4" />
                NORMAL
              </button>
            </Link>

            <Link to={`/game-fast/${title}`}>
              <button className="flex-1 bg-filmRed py-2 rounded flex items-center justify-center gap-2">
                <img src={playIcon} className="w-4" />
                RÁPIDO
              </button>
            </Link>
          </div>

          <div className="bg-filmRed p-3 rounded-lg flex items-center justify-center gap-2">
            <img src={playIcon} className="w-4" />
            <div>
              <p className="font-bold text-sm">REANUDAR PARTIDA</p>
              <p className="text-xs text-gray-200">
                07/03/2026 - RÁPIDO
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-between items-center px-20 py-7 bg-filmGray">

        <div className="flex gap-6">
          <Link to={`/game/${title}`}>
            <button
              className="bg-filmRed px-10 py-5 rounded-xl flex items-center gap-3 text-lg"
            >
              <img src={playIcon} className="w-4" />
              NORMAL
            </button>
          </Link>
          <Link to={`/game-fast/${title}`}>
            <button className="bg-filmRed px-10 py-5 rounded-xl flex items-center gap-3 text-lg">
              <img src={playIcon} className="w-6" />
              RÁPIDO
            </button>
          </Link>
        </div>

        <div className="bg-filmRed px-6 py-3 rounded-lg flex items-center gap-3">
          <img src={playIcon} className="w-5" />
          <div>
            <p className="font-bold">REANUDAR PARTIDA</p>
            <p className="text-sm text-gray-300">
              07/03/2026 - RÁPIDO
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MovieDetails;