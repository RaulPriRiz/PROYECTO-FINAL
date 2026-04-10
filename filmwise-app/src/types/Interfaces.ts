//movies.jsx
export interface IFilm {
  id: number;
  genre: string;
  image: string;
  title: string;
}

export interface IFilmDetails {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null; 
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/*🖼️ Ejemplo con tu película
Poster

Tu campo:

"poster_path": "/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg"

URL completa:

https://image.tmdb.org/t/p/w500/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg
Backdrop (fondo)
"backdrop_path": "/hGGC9gKo7CFE3fW07RA587e5kol.jpg"

URL:

https://image.tmdb.org/t/p/w780/hGGC9gKo7CFE3fW07RA587e5kol.jpg
📏 Tamaños comunes
w200 → pequeño
w500 → recomendado para posters
w780 → backdrops
original → máxima calidad

Ejemplo:

https://image.tmdb.org/t/p/original/... */