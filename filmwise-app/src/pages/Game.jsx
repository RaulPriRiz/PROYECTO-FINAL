import { useEffect, useState, useRef } from "react";
import ReactPlayerImport from "react-player";
import { useLocation } from "react-router-dom";
import { getFilmQuestions } from "../data/filmApi";
import { Link, useParams } from "react-router";
import { getFilm } from "../data/filmApi";
import Navbar from "../components/Navbar";
import seats from "../assets/asientos.png";
import { editScore } from "../data/userApi";
import QuestionModal from "../components/QuestionModal";

// (evita error de "object")
const ReactPlayer =
    ReactPlayerImport?.default ?? ReactPlayerImport;

function Game() {

    const { title } = useParams();
    const [film, setFilm] = useState(null);
    const userLogin = JSON.parse(localStorage.getItem("user")) || null;
    const [showEndModal, setShowEndModal] = useState(false);



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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showQuestion, setShowQuestion] = useState(false);
    const [score, setScore] = useState(0);
    const [playing, setPlaying] = useState(true);

    const preguntaActual = questions[currentQuestionIndex];

    // CARGA PREGUNTAS
    useEffect(() => {
        if (!film) return;

        const fetchQuestions = async () => {
            try {
                const data = await getFilmQuestions(film.title);
                setQuestions(data);
            } catch (error) {
                console.error("Error cargando preguntas:", error);
            }
        };

        fetchQuestions();
    }, [film]);

    // CONTROL VIDEO
    const handleProgress = (state) => {
        const currentTime = Math.floor(state.playedSeconds);

        if (
            preguntaActual &&
            currentTime >= preguntaActual.startSeconds &&
            !showQuestion
        ) {
            setPlaying(false);
            setShowQuestion(true);
        }
    };

    // RESPUESTA
    const handleAnswer = (answer) => {

        if (answer.correct) {
            setScore((prev) => prev + 10);
        }

        setTimeout(() => {

            setShowQuestion(false);

            setCurrentQuestionIndex((prev) => prev + 1);
            setPlaying(true);

        }, 1000);
    };

    const handleEndGame = async () => {
        try {
            await editScore(userLogin.name, score);

            setShowEndModal(true);

        } catch (error) {
            console.error("Error actualizando score:", error);
        }
    };


    if (!film) {
        return <div className="text-white p-10">Cargando película...</div>;
    }

    return (
        <div className="bg-filmBlack h-screen text-white flex flex-col overflow-hidden">

            <Navbar />

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
            <div className="absolute top-24 right-10 text-lg font-medium">
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

        </div>
    );
}

export default Game;