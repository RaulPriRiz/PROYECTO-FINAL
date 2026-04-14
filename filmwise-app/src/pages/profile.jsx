import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import { getUser, getFriendsCount } from "../data/userApi";
import play_circle from "../assets/play_circle.svg";
import star from "../assets/star.svg";
import competition from "../assets/competition.svg";
import movie from "../assets/movie.svg";
import EditProfileModal from "../components/EditProfileModal";
import ProgressBar from "../components/ProgressBar";

function Profile() {

  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(null);
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Profile montado");
        console.log("userLogin:", userLogin);
        console.log("token:", userLogin?.token);
        const data = await getUser(userLogin.name, userLogin.token);
        console.log("USER:", data);
        setUser(data);
      } catch (error) {
        alert("Error al cargar usuario");
        //navegar a no autorizado
      }
    };

    fetchUser();

    const friendsCount = async () => {
      try {
        const data = await getFriendsCount(userLogin.name);
        //console.log("FRIENDS COUNT:", data);
        setFriends(data);
      } catch (error) {
        console.error("Error al obtener número de amigos:", error);
      }
    };

    friendsCount();

  }, []);

  const userName = user ? user.name : "Nombre de usuario no encontrado";
  const friendsNumber = friends ? friends : "0";
  const userImage = user?.image ? user.image : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const userLevel = user ? user.levelId : 0;
  const userLevelName = user ? user.levelName : "Nombre del nivel no encontrado";
  const stats = user ? [{ title: "Partidas jugadas", value: user.gamesPlayed, icon: play_circle }, { title: "Aciertos totales", value: user.correctAnswers, icon: star }, { title: "Mejor puntuación", value: user.bestScore, icon: competition }, { title: "Género preferido", value: user.favoriteGenre, icon: movie }] : [];
  const score = user ? user.score : 0;
  const percentage = score % 100;
  const pointsToNextLevel = 100 - percentage;
  const nextLevel = userLevel + 1;

  return (
    <div className="bg-filmBlack min-h-screen text-white pt-24 pb-24">

      <Navbar />

      <div className="px-8 md:px-16 flex flex-col md:flex-row justify-between gap-10 md:gap-0">

        {/* Columna izq. */}
        <div>
          {/* APARTADO PERFIL */}
          <div className="flex items-center gap-4 flex-wrap">

            <img
              src={userImage}
              alt="Profile"
              className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover"
            />

            <div className="flex flex-col">

              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                {userName}
              </h2>
              <span className="text-sm mt-1 font-semibold">
                {friendsNumber} Amigos
              </span>

              <div className="flex gap-5 mt-4 md:mt-10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red-900 hover:bg-red-700 px-4 py-2 md:px-8 rounded-full text-sm font-semibold transition">
                  Editar perfil
                </button>
                <button className="bg-red-900 hover:bg-red-700 px-6 py-2 md:px-10 rounded-full text-sm font-semibold transition">
                  + Amigo
                </button>
              </div>

            </div>
          </div>

          {/* APARTADO NIVEL */}
          <div className="mt-16 bg-[#252525] rounded-2xl p-4 md:p-6 w-full md:w-[500px]">

            <h3 className="text-xl md:text-2xl mb-5 md:mb-8">
              Nivel {userLevel} - {userLevelName}
            </h3>

            <div className="flex items-center gap-3 md:gap-5">

              <ProgressBar percent={percentage} />
              <p className="text-2xl">
                {percentage}%
              </p>
            </div>
            <p className="mt-4">
              {pointsToNextLevel} puntos para subir al nivel {nextLevel}
            </p>

          </div>

        </div>

        {/*APARTADO STATS derecha*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
}

export default Profile;