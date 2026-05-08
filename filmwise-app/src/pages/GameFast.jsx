import { useEffect, useState, useRef } from "react";
import ReactPlayerImport from "react-player";
import { getFilmQuestions, getFilm } from "../data/filmApi";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import seats from "../assets/asientos.png";
import { editCorrectAnswers, editScore, editBestScore, editGamesPlayed } from "../data/userApi";
import { createNewGame, editGameScore, editGameIsFinished } from "../data/gameApi";
import QuestionModalFast from "../components/QuestionModalFast";
import { updateGame } from "../data/gameApi";
import { useNavigate } from "react-router-dom";

const ReactPlayer = ReactPlayerImport?.default ?? ReactPlayerImport;

function GameFast() {

    const { title } = useParams();
    const [film, setFilm] = useState(null);
    const userLogin = JSON.parse(localStorage.getItem("user")) || null;

    const [showEndModal, setShowEndModal] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const playerRef = useRef(null);
    const [questions, setQuestions] = useState([]);
    const [showQuestion, setShowQuestion] = useState(false);
    const [score, setScore] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [preguntaActual, setPreguntaActual] = useState(null);
    const [game, setGame] = useState(null);
    const [lastSecond, setLastSecond] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [showExitModal, setShowExitModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const filmData = await getFilm(title);
                setFilm(filmData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovie();
    }, []);

    useEffect(() => {
        if (!film) return;

        const start = async () => {
            try {
                const data = await getFilmQuestions(film.title);
                setQuestions(data);
            } catch (error) {
                console.error("Error cargando preguntas:", error.message);
            }

            if (userLogin) {
                const game = await createNewGame(userLogin.name, film.title, "NORMAL");
                setGame(game);
                //ponemos el score guardado de la partida en el score que se va guardado
                setScore(game.score);
            }
        };
        start();
    }, [film]);

    const handleProgress = (state) => {
        const time = Math.floor(state.playedSeconds);
        setCurrentTime(time);

        const preguntaParaAhora = questions.find(q => q.startSeconds === time);

        if (preguntaParaAhora && !showQuestion && lastSecond !== time) {
            setPlaying(false);
            setPreguntaActual(preguntaParaAhora);
            setShowQuestion(true);
            setLastSecond(time); // Bloqueamos este segundo
        }
    };

    //cuando el player esté ready entonces ejecutamos está función que pone el tiempo del vídeo igual que el atributo lastTime de la partida encontrada
    const handlePlayerReady = () => {
        if (game) playerRef.current.seekTo(game.lastTime, "seconds");
    };


    const handleAnswer = async (answer) => {

        if (answer.correct) {
            const newScore = score + 15;
            setScore(newScore);
            await editGameScore(userLogin.name, film.title, 15);
            setCorrectAnswers(prev => prev + 1);
        }

        setTimeout(() => {
            setShowQuestion(false);
            setPlaying(true);
        }, 1000);
    };

    const handleSaveGame = async () => {
        try {
            await updateGame(userLogin.name, film.title, currentTime);
            navigate("/movies");
        } catch (e) {
            console.error(e);
        }
    };

    const handleContinueGame = () => {
        setShowExitModal(false);
        setPlaying(true);
    };

    // CUANDO SE ACABA EL TIEMPO
    const handleTimeout = () => {
        setShowQuestion(false);
        setPlaying(true);
    };

    const handleEndGame = async () => {
        try {
            await editScore(userLogin.name, score);
            await editCorrectAnswers(userLogin.name, correctAnswers);
            await editBestScore(userLogin.name, score);
            await editGamesPlayed(userLogin.name);
            await editGameIsFinished(userLogin.name, film.title);
            setShowEndModal(true);
        } catch (error) {
            console.error("Error actualizando score:", error);
        }
    };

    if (!film) {
        return <div className="text-white p-10">Cargando película...</div>;
    }

    return (
        <div className="bg-filmBlack min-h-screen text-white flex flex-col overflow-hidden">

            <Navbar />

            {/* BOTÓN SALIR */}
            <button
                onClick={() => {
                    setPlaying(false);
                    setShowExitModal(true);
                }}
                className="absolute top-20 right-4 md:top-24 md:right-10 bg-red-600 px-3 py-2 rounded-full z-50"
            >
                ✕
            </button>

            {/* SCORE */}
            <div className="absolute top-20 left-4 md:top-24 md:left-10 text-sm md:text-lg font-medium">
                Puntuación: {score}
            </div>

            <div className="flex flex-1 items-center justify-center pt-4 pb-2">

                <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto relative px-2 md:px-0 md:ml-80">

                    {/* VIDEO */}
                    <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
                        <div className="w-full md:w-[1520px] aspect-video md:h-[800px]">
                            <ReactPlayer
                                ref={playerRef}
                                url={film.videoUrl}
                                playing={playing}
                                onReady={handlePlayerReady}
                                onProgress={handleProgress}
                                controls={false}
                                width="100%"
                                height="100%"
                                onEnded={handleEndGame}
                            />
                        </div>
                    </div>

                    {/* PREGUNTAS */}
                    <div
                        className={`absolute inset-0 flex justify-center items-center ${showQuestion ? "" : "hidden"
                            }`}
                    >
                        <QuestionModalFast
                            isOpen={showQuestion}
                            question={preguntaActual}
                            onAnswer={handleAnswer}
                            onTimeout={handleTimeout}
                        />
                    </div>

                </div>
            </div>

            {/* ASIENTOS */}
            <div className="h-24 md:h-48">
                <img
                    src={seats}
                    alt="asientos"
                    className="w-full h-full object-bottom opacity-90"
                />
            </div>

            {/* MODAL FINAL */}
            {showEndModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1f1f1f] p-6 md:p-8 rounded-xl text-center w-full max-w-md">

                        <h2 className="text-xl md:text-2xl mb-4">
                            Modo rápido terminado
                        </h2>

                        <p className="text-base md:text-lg mb-6">
                            Puntuación: {score}
                        </p>

                        <button
                            onClick={() => window.location.href = "/movies"}
                            className="bg-filmGold text-filmBlack px-6 py-2 rounded-lg w-full md:w-auto"
                        >
                            Continuar
                        </button>

                    </div>
                </div>
            )}

            {/* MODAL SALIR PARTIDA */}
            {showExitModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">

                    <div className="bg-[#1f1f1f] p-6 md:p-8 rounded-xl text-center w-full max-w-md">

                        <h2 className="text-lg md:text-xl mb-6">
                            ¿Seguro que quieres salir de la partida?
                        </h2>

                        <div className="flex flex-col md:flex-row justify-center gap-4">

                            <button
                                onClick={handleSaveGame}
                                className="bg-filmGold text-black px-4 py-2 rounded w-full md:w-auto"
                            >
                                Guardar y salir
                            </button>

                            <button
                                onClick={handleContinueGame}
                                className="bg-gray-600 px-4 py-2 rounded w-full md:w-auto"
                            >
                                Continuar
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default GameFast;