import { useEffect, useState, useRef } from "react";
import ReactPlayerImport from "react-player";
import { getFilmQuestions, getFilm } from "../data/filmApi";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import seats from "../assets/asientos.png";
import { editScore } from "../data/userApi";
import QuestionModalFast from "../components/QuestionModalFast";

const ReactPlayer =
    ReactPlayerImport?.default ?? ReactPlayerImport;

function GameFast() {

    const { title } = useParams();
    const [film, setFilm] = useState(null);
    const userLogin = JSON.parse(localStorage.getItem("user")) || null;

    const [showEndModal, setShowEndModal] = useState(false);

    const playerRef = useRef(null);

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showQuestion, setShowQuestion] = useState(false);
    const [score, setScore] = useState(0);
    const [playing, setPlaying] = useState(true);

    const preguntaActual = questions[currentQuestionIndex];

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

        const fetchQuestions = async () => {
            try {
                const data = await getFilmQuestions(film.title);
                setQuestions(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuestions();
    }, [film]);

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

    // RESPUESTA MODO RÁPIDO
    const handleAnswer = (answer) => {

        if (answer.correct) {
            setScore((prev) => prev + 15);
        }

        setTimeout(() => {
            setShowQuestion(false);
            setCurrentQuestionIndex((prev) => prev + 1);
            setPlaying(true);
        }, 1000);
    };

    // CUANDO SE ACABA EL TIEMPO
    const handleTimeout = () => {
        setShowQuestion(false);
        setCurrentQuestionIndex((prev) => prev + 1);
        setPlaying(true);
    };

    const handleEndGame = async () => {
        try {
            await editScore(userLogin.name, score);
            setShowEndModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    if (!film) {
        return <div className="text-white p-10">Cargando película...</div>;
    }

    return (
        <div className="bg-filmBlack h-screen text-white flex flex-col overflow-hidden">

            <Navbar />

            <div className="flex flex-1 items-center justify-center pt-4 pb-2">

                <div className="flex w-full max-w-7xl mx-auto h-[380px] relative ml-80">

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

                    <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${showQuestion ? '' : 'hidden'}`}>
                        <QuestionModalFast
                            isOpen={showQuestion}
                            question={preguntaActual}
                            onAnswer={handleAnswer}
                            onTimeout={handleTimeout}
                        />
                    </div>

                </div>
            </div>

            <div className="h-48">
                <img
                    src={seats}
                    alt="asientos"
                    className="w-full h-full object-bottom opacity-90"
                />
            </div>

            <div className="absolute top-24 right-10 text-lg">
                Puntuación: {score}
            </div>

            {showEndModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-[#1f1f1f] p-8 rounded-xl text-center">

                        <h2 className="text-2xl mb-4">Modo rápido terminado</h2>

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

export default GameFast;