import { useEffect, useState, useRef } from "react";
import ReactPlayerImport from "react-player";
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router";
import { getFilm, getFilmQuestions } from "../data/filmApi";
import Navbar from "../components/Navbar";
import seats from "../assets/asientos.png";
import { editCorrectAnswers, editScore, editBestScore, editGamesPlayed, editFavoriteGenre } from "../data/userApi";
import { createNewGame, editGameScore, editGameIsFinished } from "../data/gameApi";
import QuestionModal from "../components/QuestionModal";
import { updateGame } from "../data/gameApi";
import { useNavigate } from "react-router-dom";

// (evita error de "object")
const ReactPlayer = ReactPlayerImport?.default ?? ReactPlayerImport;

function Game() {

    const { title } = useParams();
    const [film, setFilm] = useState(null);
    const userLogin = JSON.parse(localStorage.getItem("user")) || null;
    const [showEndModal, setShowEndModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); //estado pa guardar el tiempo
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

    const playerRef = useRef(null);

    const [questions, setQuestions] = useState([]);
    const [showQuestion, setShowQuestion] = useState(false);
    const [score, setScore] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [game, setGame] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [preguntaActual, setPreguntaActual] = useState(null);
    const [lastSecond, setLastSecond] = useState(null);

    //cargar las preguntas + crear partida
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
        if (game) {
            playerRef.current.seekTo(game.lastTime, "seconds");
            console.log(game.lastTime);
        }
    };

    //RESPUESTA
    const handleAnswer = async (answer) => {

        if (answer.correct) {
            const newScore = score + 10;
            setScore(newScore);
            await editGameScore(userLogin.name, film.title, 10);
            setCorrectAnswers(prev => prev + 1);

            const centenaActual = Math.floor(newScore / 100);
            // Si la nueva centena es igual al nivel actual, subimos nivel (por ejemplo centena 1 y nivel 1 entonces es que tiene +100 puntos por lo que deberia subir al nivel 2)
            if (newScore >= 100 && centenaActual === userLogin.levelId) {
                await editLevel(userLogin.name);
            }
        }
        setTimeout(() => {
                setShowQuestion(false);
                setPlaying(true);
            }, 1000);
    }

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


    const handleEndGame = async () => {
        try {
            await editScore(userLogin.name, score);
            await editCorrectAnswers(userLogin.name, correctAnswers);
            await editBestScore(userLogin.name, score);
            await editGamesPlayed(userLogin.name);
            await editFavoriteGenre(userLogin.name);
            await editGameIsFinished(userLogin.name, film.title);
            setShowEndModal(true);
        } catch (error) {
            console.error("Error actualizando score:", error.message);
        }
    };


    if (!film) {
        return <div className="text-white p-10">Cargando película...</div>;
    }

    return (
        <div className="bg-filmBlack h-screen text-white flex flex-col overflow-hidden">

            <Navbar />

            <button
                onClick={() => {
                    setPlaying(false); // pausamos video
                    setShowExitModal(true);
                }}
                className="absolute top-24 right-24 bg-red-600 px-3 py-2 rounded-full z-50"
            >
                ✕
            </button>

            <div className="flex flex-1 items-center justify-center overflow-hidden pt-4 pb-2">

                {/* VIDEO + PREGUNTAS */}
                <div className="flex w-full max-w-7xl mx-auto h-[380px] relative ml-80">

                    {/* VIDEO */}
                    <div className="flex-1 flex justify-center items-center">
                        <div className="w-[1520px] h-[800px]">
                            <ReactPlayer
                                ref={playerRef}
                                url={film.videoUrl}
                                playing={playing}
                                onReady={handlePlayerReady}
                                onProgress={handleProgress}
                                controls
                                width="100%"
                                height="100%"
                                onEnded={handleEndGame}
                            />
                        </div>
                    </div>

                    {/* PREGUNTAS */}
                    <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${showQuestion ? '' : 'hidden'}`}>
                        <QuestionModal
                            isOpen={showQuestion}
                            question={preguntaActual}
                            onAnswer={handleAnswer}
                        />
                    </div>

                </div>
            </div>

            {/* ASIENTOS */}
            <div className="h-48">
                <img
                    src={seats}
                    alt="asientos de cine"
                    className="w-full h-full object-bottom opacity-90"
                />
            </div>

            {/* SCORE */}
            <div className="absolute top-24 left-10 text-lg font-medium">
                Puntuación: {score}
            </div>

            {/* MODAL FINAL */}
            {showEndModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-[#1f1f1f] p-8 rounded-xl text-center">

                        <h2 className="text-2xl mb-4">Partida terminada</h2>

                        <p className="text-lg mb-6">
                            Puntuación: {score}
                        </p>

                        <button
                            onClick={() => window.location.href = "/movies"}
                            className="bg-filmGold text-filmBlack px-6 py-2 rounded-lg"
                        >
                            Continuar
                        </button>

                    </div>
                </div>
            )}

            {/* MODAL SALIR PARTIDA */}
            {showExitModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

                    <div className="bg-[#1f1f1f] p-8 rounded-xl text-center w-[90%] max-w-md">

                        <h2 className="text-xl mb-6">
                            ¿Seguro que quieres salir de la partida?
                        </h2>

                        <div className="flex justify-center gap-4">

                            <button
                                onClick={handleSaveGame}
                                className="bg-filmGold text-black px-4 py-2 rounded"
                            >
                                Guardar y salir
                            </button>

                            <button
                                onClick={handleContinueGame}
                                className="bg-gray-600 px-4 py-2 rounded"
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
export default Game;