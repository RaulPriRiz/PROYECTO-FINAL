import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useLocation } from "react-router-dom";
import { getFilmQuestions } from "../data/filmApi";
import Navbar from "../components/Navbar";
import QuestionModal from "../components/QuestionModal";
import seats from "../assets/asientos.png";

function Game() {

    const navigate = useNavigate();
    const location = useLocation();

    const film = location.state?.film;

    console.log("FILM EN GAME:", film);

    // Protección acceso directo
    useEffect(() => {
        if (!film) {
            return (
                <div className="text-white p-10">
                    Cargando película...
                </div>
            );
        }
    }, [film]);

    const playerRef = useRef(null);

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showQuestion, setShowQuestion] = useState(false);
    const [score, setScore] = useState(0);
    const [playing, setPlaying] = useState(true);

    // Pregunta actual
    const preguntaActual = questions[currentQuestionIndex];

    // Cargar preguntas
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getFilmQuestions(film.title);
                setQuestions(data);
            } catch (error) {
                console.error("Error cargando preguntas:", error);
            }
        };

        fetchQuestions();
    }, []);

    // Control del tiempo del video
    const handleProgress = (state) => {
        const currentTime = Math.floor(state.playedSeconds);

        if (
            preguntaActual &&
            currentTime >= preguntaActual.startSeconds &&
            !showQuestion
        ) {
            setPlaying(false);     //  pausa video
            setShowQuestion(true); //  muestra pregunta
        }
    };

    // Respuesta
    const handleAnswer = (answer) => {

        if (answer.correct) {
            setScore((prev) => prev + 10);
        }

        setShowQuestion(false);
        setPlaying(true); // reanuda video
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    return (
        <div className="bg-filmBlack min-h-screen text-white">

            <Navbar />

            <div className="pt-20 flex flex-col items-center">

                {/* VIDEO */}
                <div className="w-full max-w-5xl">
                    <ReactPlayer
                        ref={playerRef}
                        url={film.videoUrl}
                        playing={playing}
                        onProgress={handleProgress}
                        controls={true}
                        width="100%"
                        height="500px"
                    />
                </div>

                {/* MODAL PREGUNTA (renderizado condicional) */}
                {preguntaActual && (
                    <QuestionModal
                        isOpen={showQuestion}
                        question={preguntaActual}
                        onAnswer={handleAnswer}
                    />
                )}

                <img
                    src={seats}
                    alt="seats"
                    className="w-full mt-10 opacity-90"
                />

                {/* SCORE */}
                <p className="mt-4 text-lg">
                    Puntuación: {score}
                </p>

            </div>
        </div>
    );
}

export default Game;