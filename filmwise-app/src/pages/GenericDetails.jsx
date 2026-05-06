import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFilm } from "../data/filmApi";
import { getMostRecentGame } from "../data/gameApi";
import Navbar from "../components/Navbar";

import playIcon from "../assets/play_circle.svg";

const GenericDetails = () => {

    const { title } = useParams();

    const [film, setFilm] = useState(null);
    const [mostRecentGame, setMostRecentGame] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filmData = await getFilm(title);
                setFilm(filmData);

                const user = JSON.parse(localStorage.getItem("user"));
                const recentGame = await getMostRecentGame(user.name, title);
                setMostRecentGame(recentGame);

            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [title]);

    if (!film) return <div className="text-white p-4">Cargando...</div>;

    return (
        <div className="bg-filmBlack text-white min-h-screen flex flex-col">

            <Navbar />

            <div className="relative w-full h-[200px] md:h-[85vh]">
                <img
                    src={film.image}
                    alt={film.title}
                    className="w-full h-full object-cover opacity-60"
                />

                {/* ORDENADOR */}
                <div className="hidden md:flex absolute inset-0 bg-black/70 px-20 py-12 gap-16 items-center">

                    <img
                        src={film.image}
                        alt="poster"
                        className="w-96 rounded-2xl shadow-2xl"
                    />

                    <div className="flex flex-col justify-center max-w-3xl">

                        <h1 className="text-6xl font-bold mb-6">
                            {film.title}
                        </h1>

                        <p className="text-lg text-gray-300 mb-6">
                            {film.genre}
                        </p>

                    </div>
                </div>
            </div>

            {/* MOVIL */}
            <div className="flex-1 p-4 md:hidden flex flex-col justify-between">

                <div>

                    <h1 className="text-xl font-bold text-center mb-2">
                        {film.title}
                    </h1>

                    <p className="text-sm text-gray-400 text-center mb-2">
                        {film.genre}
                    </p>

                    <p className="text-xs text-gray-500 text-center mb-4">
                        Insertado: {film.insertDate}
                    </p>

                    <div className="flex justify-center my-4">
                        <img
                            src={film.image}
                            alt="poster"
                            className="w-44 rounded-xl shadow-lg"
                        />
                    </div>

                </div>

                {/* BOTONES */}
                <div>

                    <div className="flex gap-3 mb-4">
                        <Link to={`/game/${title}`}>
                            <button className="flex-1 bg-filmRed py-2 rounded flex items-center justify-center gap-2">
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

                    {/* ÚLTIMO ACCESO */}
                    <div className="bg-gray-500 p-3 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <p className="font-bold text-sm">ÚLTIMO ACCESO:</p>

                            <div className="text-sm text-gray-300">
                                {mostRecentGame ? (
                                    <p className="text-xs text-gray-200">
                                        {mostRecentGame.lastPlayed} - {mostRecentGame.mode}
                                    </p>
                                ) : (
                                    <p className="text-sm text-white italic">
                                        Aún no has jugado
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="hidden md:flex justify-between items-center px-20 py-7 bg-filmGray">

                <div className="flex gap-6">
                    <Link to={`/game/${title}`}>
                        <button className="bg-filmRed px-10 py-5 rounded-xl flex items-center gap-3 text-lg">
                            <img src={playIcon} className="w-5" />
                            NORMAL
                        </button>
                    </Link>

                    <Link to={`/game-fast/${title}`}>
                        <button className="bg-filmRed px-10 py-5 rounded-xl flex items-center gap-3 text-lg">
                            <img src={playIcon} className="w-5" />
                            RÁPIDO
                        </button>
                    </Link>
                </div>

                <div className="bg-gray-500 px-6 py-3 rounded-lg">
                    <p className="font-bold">ÚLTIMO ACCESO:</p>

                    <div className="text-sm text-gray-300">
                        {mostRecentGame ? (
                            <p className="text-xs text-gray-200">
                                {mostRecentGame.lastPlayed} - {mostRecentGame.mode}
                            </p>
                        ) : (
                            <p className="text-sm text-white italic">
                                Aún no has jugado
                            </p>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default GenericDetails;