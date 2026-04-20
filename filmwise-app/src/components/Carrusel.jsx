import { useState, useEffect } from "react";
import leftArrow from "../assets/left.svg";
import rightArrow from "../assets/right.svg";

function Carrusel({ movies }) {

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % movies.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  // AUTOPLAY
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return null;

  return (
    <div className="relative w-full mt-6 overflow-hidden">

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={movie.imageCarrousel}
            alt={movie.title}
            className="w-full h-[350px] object-cover object-[center_35%] flex-shrink-0"
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 transition w-12 h-12 rounded-full flex items-center justify-center">
        <img src={leftArrow} alt="prev" className="w-5 h-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 transition w-12 h-12 rounded-full flex items-center justify-center">
        <img src={rightArrow} alt="next" className="w-5 h-5" />
      </button>

    </div>
  );
}

export default Carrusel;