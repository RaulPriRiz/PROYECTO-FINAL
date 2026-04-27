import { useEffect, useState, useRef } from "react";
import ReactPlayerImport from "react-player";
import { getFilmQuestions, getFilm } from "../data/filmApi";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import seats from "../assets/asientos.png";
import { editCorrectAnswers, editScore, editBestScore } from "../data/userApi";
import { createNewGame, editGameScore, editGameIsFinished } from "../data/gameApi";
import QuestionModalFast from "../components/QuestionModalFast";

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
        fetchQuestions();
    }, [film]);

    const handleProgress = (state) => {
        const time = Math.floor(state.playedSeconds);
        setCurrentTime(time);

        const preguntaParaAhora = questions.find(q => q.startSeconds === time);

        if (preguntaParaAhora && !showQuestion) {
            setPlaying(false);
            setPreguntaActual(preguntaParaAhora);
            setShowQuestion(true);
        }
    };

    //cuando el player esté ready entonces ejecutamos está función que pone el tiempo del vídeo igual que el atributo lastTime de la partida encontrada
    const handlePlayerReady = () => {
        if(game) playerRef.current.seekTo(game.lastTime, "seconds");
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
                                onReady={handlePlayerReady}
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