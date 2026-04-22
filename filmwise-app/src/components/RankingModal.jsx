import { useState, useEffect } from "react";
import { getRankingUsers } from "../data/userApi";
import RankingUserCard from "./RankingUserCard";

const RankingModal = ({ isOpen, onClose, }) => {

  const [rankingUsers, setRankingUsers] = useState([]);

  useEffect(() => {
    const fetchRankingUsers = async () => {
      try {
        const data = await getRankingUsers();
        console.log("RANKING:", data);
        setRankingUsers(data);
      } catch (error) {
        console.log(error.message);
      }
    };

        fetchRankingUsers();
    }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-filmGray w-[90%] md:w-[500px] rounded-2xl p-6 relative max-h-[800px] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-serif mb-6 text-center">
          TOP JUGADORES
        </h2>

        <div className="flex flex-col gap-4">
          {rankingUsers.map((user, index) => (
            <RankingUserCard
              key={user.id}
              name={user.name}
              picture={user.image}
              points={user.score}
              position={index + 1}
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export default RankingModal;