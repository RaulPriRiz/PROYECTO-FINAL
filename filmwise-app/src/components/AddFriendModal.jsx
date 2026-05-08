import React, { useState, useEffect } from "react";
import { createNewMessage, getFriends } from "../data/userApi";

const AddFriendModal = ({ isOpen, onClose, user }) => {

  const [emisorName, setEmisorName] = useState("");
  const [receptorName, setReceptorName] = useState("");
  const [friends, setFriends] = useState([]);

  //cuando se abre y llega user
  useEffect(() => {
    if (isOpen && user) {

      setEmisorName(user.name || "");
      setReceptorName("");

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
      await createNewMessage(emisorName, receptorName);
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

        <h2 className="text-2xl font-serif mb-6 text-center">
          ¡Añade amigos!
        </h2>

        <div className="flex flex-col gap-5">

          {/* NOMBRE USUARIO RECEPTOR */}
          <label className="text-sm text-gray-300">
            Introduce el nombre del usuario al que quieres añadir como amigo. Cuando acepte tu solicitud, seréis amigos.
          </label>
          <input
            type="text"
            value={receptorName}
            onChange={(e) => setReceptorName(e.target.value)}
            className="bg-filmBlack p-3 rounded outline-none text-white"
          />

          <button
            onClick={handleSend}
            className="bg-filmGold text-black font-bold py-3 rounded-lg mt-4 hover:opacity-90 transition"
          >
            ENVIAR SOLICITUD
          </button>

          {/* LISTA DE AMIGOS */}
          <h2 className="mt-4 text-2xl font-serif text-center">
            Mis amigos:
          </h2>
          <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-3">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 bg-[#252525] px-4 py-2 rounded-xl"
              >
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <p className="text-lg md:text-lg font-semibold px-2">{friend.name}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;