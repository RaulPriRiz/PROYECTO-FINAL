import Navbar from "../components/Navbar";
import bar from "../assets/bar.png";
import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import { getUser, getFriendsCount } from "../data/userApi";
import play_circle from "../assets/play_circle.svg";
import star from "../assets/star.svg";
import competition from "../assets/competition.svg";
import movie from "../assets/movie.svg";
import EditProfileModal from "../components/EditProfileModal";

function Profile() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(null);

  const userLogin = JSON.parse(localStorage.getItem("user"));

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(userLogin.name);
        console.log("USER:", data);
        setUser(data);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };

    fetchUser();

    const friendsCount = async () => {
      try {
        const data = await getFriendsCount(userLogin.name);
        console.log("USER:", data);
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
  const stats = user ? [{ title: "Partidas jugadas", value: user.gamesPlayed, icon: play_circle }, { title: "Aciertos totales", value: user.correctAnswers, icon: star }, { title: "Mejor puntuación", value: user.bestScore, icon: competition }, { title: "Género preferido", value: user.favoriteGenre, icon: movie }] : [];

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
              Nivel 7 - Cinéfilo Experto
            </h3>

            <div className="flex items-center gap-3 md:gap-5">

              <img
                src={bar}
                alt="progress bar"
                className="flex-1 max-w-[80%] md:max-w-none h-6 object-cover rounded-full"
              />
              <p className="text-2xl">
                65%
              </p>
            </div>
            <p className="mt-4">
              35 puntos para subir al nivel 8
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