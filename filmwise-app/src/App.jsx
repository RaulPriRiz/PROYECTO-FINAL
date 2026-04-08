import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/home";
import Movies from "./pages/movies";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
		    <Route path="/movies" element={<Movies />} />
        <Route path="/details/:title" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;