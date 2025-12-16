import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Carpeta pública
app.use(express.static("public"));

// Tu API Key real (solo la clave)
const OMDB_API_KEY = "bd48eb47"; // <-- tu clave sin URL

app.get("/inception", async (req, res) => {
  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=tt1375666&plot=full`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      return res.status(500).json({ error: "No se encontró la película" });
    }

    res.json(data); // Enviamos tal cual OMDb
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al llamar a OMDb" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
