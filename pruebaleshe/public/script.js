async function cargarPelicula() {
  try {
    const res = await fetch("/inception");
    const movie = await res.json();

    document.getElementById("movie").innerHTML = `
      <h2>${movie.Title} (${movie.Year})</h2>
      <p><strong>Rating:</strong> ${movie.imdbRating}</p>
      <p>${movie.Plot}</p>
      <img src="${movie.Poster}" alt="Poster de ${movie.Title}" style="max-width:200px;">
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("movie").innerHTML = "Error cargando datos";
  }
}

cargarPelicula();


