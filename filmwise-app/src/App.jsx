import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/home";
import Movies from "./pages/movies";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/profile";
import Competition from "./pages/competition";
import Unauthorized from "./pages/Unauthorized";
import Game from "./pages/Game";
import GameFast from "./pages/GameFast";
import AdminPanel from "./pages/AdminPanel";
import GenericDetails from "./pages/GenericDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/details/:title" element={<MovieDetails />} />
        <Route path="/gendetails/:title" element={<GenericDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/game/:title" element={<Game />} />
        <Route path="/game-fast/:title" element={<GameFast />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;