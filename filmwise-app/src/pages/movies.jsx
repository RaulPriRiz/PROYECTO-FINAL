import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import search from "../assets/search.svg";
import { getFilms } from "../data/filmApi";
import Navbar from "../components/Navbar";

function Movies() {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getFilms();
        setMovies(data);
      } catch (error) {
        console.error("Error al cargar películas:", error.message);
      }
    };

    fetchFilms();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    
    const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());

    const matchesGenre = statusFilter === "Todas" || movie.genre === statusFilter;

    return matchesTitle && matchesGenre;
  });

  return (
    <div className="bg-filmBlack min-h-screen text-white px-6 md:px-10 pt-24 pb-24">

      <Navbar />

      <div className="flex justify-center mb-12 md:mb-20">
        <div className="flex bg-filmGray w-full max-w-2xl">

          <input
            type="text"
            placeholder="Buscar Películas..."
            className="bg-transparent px-4 py-2 flex-1 outline-none text-sm"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />

          <div className="flex items-center px-4">
            <img src={search} alt="search" className="w-5 h-5" />
          </div>

          <select
            className="bg-filmGold text-black px-4 py-2 text-sm outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Ciencia ficción">Ciencia ficción</option>
            <option value="Acción">Acción</option>
            <option value="Animación">Animación</option>
            <option value="Terror">Terror</option>
          </select>

        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 justify-items-center">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            image={movie.image}
            genre={movie.genre}
          />
        ))}
      </div>

    </div>
  );
}

export default Movies;