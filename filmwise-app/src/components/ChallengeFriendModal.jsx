import React, { useState, useEffect } from "react";
import { createNewChallengeMessage, getFriends } from "../data/userApi";

const ChallengeFriendModal = ({ isOpen, onClose, user }) => {

  const [emisorName, setEmisorName] = useState("");
  const [receptorName, setReceptorName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [friends, setFriends] = useState([]);

  //cuando se abre y llega user
  useEffect(() => {
    if (isOpen && user) {

      setEmisorName(user.name || "");
      setReceptorName("");
      setMessageText("");

      const fetchFriends = async () => {
        try {
          const data = await getFriends(user.name);
          console.log("FRIENDS:", data);
          setFriends(data);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchFriends();
    }
  }, [isOpen, user]);

  const handleSend = async () => {
    try {
      await createNewChallengeMessage(emisorName, receptorName, messageText);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-filmGray w-[90%] md:w-[500px] rounded-2xl p-6 relative">

        {/* CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Reta a un amigo
        </h2>

        <div className="flex flex-col gap-5">

          {/* NOMBRE USUARIO RECEPTOR */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">
              Escoge el amigo al que quieres retar.
            </label>
            <select
              value={receptorName}
              onChange={(e) => setReceptorName(e.target.value)}
              className="p-2 bg-gray-800 rounded"
            >
              <option value="" disabled>
                ...
              </option>

              {friends.map((friend) => (
                <option key={friend.id} value={friend.name}>
                  {friend.name}
                </option>
              ))}
            </select>
          </div>

          {/* mensaje*/}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">
              Introduce el mensaje de reto.
            </label>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="bg-filmBlack p-3 rounded outline-none text-white"
            />
          </div>

          <button
            onClick={handleSend}
            className="bg-filmGold text-black font-bold py-3 rounded-lg mt-4 hover:opacity-90 transition"
          >
            RETAR
          </button>

        </div>
      </div>
    </div>
  );
};

export default ChallengeFriendModal;