import Navbar from "../components/Navbar";
import MissionCard from "../components/MissionCard";
import star from "../assets/star.svg";
import { useState, useEffect } from "react";
import { getUser, getMissions } from "../data/userApi";
import swords from "../assets/swords.svg";
import ranking from "../assets/ranking.svg";
import ProgressBar from "../components/ProgressBar";
import movie from "../assets/movie.svg";
import play_circle from "../assets/play_circle.svg";
import competition from "../assets/competition.svg";
import RankingModal from "../components/RankingModal";
import { useNavigate } from "react-router-dom";
import ChallengeFriendModal from "../components/ChallengeFriendModal";

function Competition() {

  const navigate = useNavigate();

  const [missions, setMissions] = useState([]);
  const userLogin = JSON.parse(localStorage.getItem("user")) || null;
  const [isChallengeFriendOpen, setIsChallengeFriendOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  useEffect(() => {

    //el usuario directamente no hizo login ni tiene token:
    if (!userLogin || !userLogin.token) {
      //cambia la última ruta del historial que sería competition por /unauthorized para que no se quede en bucle al darle a Atrás
      navigate("/unauthorized", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        await getUser(userLogin.name, userLogin.token);
        const data = await getMissions(userLogin.name);
        console.log("Datos que llegan de las misiones:", data);
        setMissions(data);
      } catch (error) {
        //el usuario tiene token pero es desautorizado
        if (error.message === "UNAUTHORIZED") {
          navigate("/unauthorized", { replace: true });
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  const icons = [star, movie, play_circle, competition];

  const totalMissions = missions.length;
  const completedMissions = missions.filter(mission => mission.pointsCompleted === mission.points).length;
  const globalPercent = totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0;
  const globalProgress = completedMissions + "/" + totalMissions;

  return (
    <div className="bg-filmBlack min-h-screen text-white pt-24 pb-24">

      <Navbar />

      <div className="px-6 md:px-16 flex flex-col md:flex-row justify-between gap-10 md:gap-0">

        {/* LISTA MISSIONCARDS izq */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">

          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            MISIONES
          </h2>

          {missions.map((mission, index) => {

            const percentage = (mission.pointsCompleted / mission.points) * 100;
            const progressCalc = mission.pointsCompleted + "/" + mission.points;
            const icon = icons[index % icons.length];

            return (
              <MissionCard
                key={index}
                title={mission.descripcion}
                icon={icon}
                percent={percentage}
                progress={progressCalc}
              />
            );
          })}

        </div>

        {/* derecha */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:mt-44">

          <div className="w-full md:w-[700px] rounded-2xl flex flex-col gap-5">

            <p className="text-2xl md:text-4xl">
              PRIMEROS PASOS
            </p>

            <div className="mt-2 mb-2">
              <ProgressBar percent={globalPercent} progress={globalProgress} />
            </div>

          </div>


          <div className="w-full md:w-[700px] flex flex-col md:flex-row gap-4 mt-4">

            <button 
              onClick={() => setIsChallengeFriendOpen(true)}
              className="h-20 md:h-40 md:flex-1 flex items-center justify-center gap-5 bg-red-600 hover:bg-red-700 transition-colors text-white text-xl md:text-2xl rounded-xl">
              <img src={swords} alt="swords icon" className="w-10 h-10 md:w-12 md:h-12" />
              Retar a un amigo
            </button>

            <button
              onClick={() => setIsRankingOpen(true)}
              className="h-20 md:h-40 md:flex-1 flex items-center justify-center gap-3 bg-filmGold hover:brightness-90 transition-colors text-white text-xl md:text-2xl rounded-xl">
              <img src={ranking} alt="ranking icon" className="w-12 h-12 md:w-16 md:h-16" />
              Ver ranking
            </button>

          </div>

        </div>

      </div>

      <ChallengeFriendModal
        isOpen={isChallengeFriendOpen}
        onClose={() => setIsChallengeFriendOpen(false)}
        user={userLogin}
      />

      <RankingModal
        isOpen={isRankingOpen}
        onClose={() => setIsRankingOpen(false)}
      />

    </div>
  );
}

export default Competition;
