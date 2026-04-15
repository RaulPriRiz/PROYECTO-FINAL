import React, { useState, useEffect } from "react";
import { editName, editEmail, editImage } from "../data/userApi";

const EditProfileModal = ({ isOpen, onClose, user }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  //Cargar datos cuando llega user
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setImage(user.image || "");
    }
  }, [user]);

  if (!isOpen) return null;

  //GUARDAR CAMBIOS
  const handleSave = async () => {
    try {
      
      if (!name || !email) {
        alert("Nombre y email son obligatorios");
        return;
      }

      var changes = false;

      //SOLO si hay cambios se edita
      if (name !== user.name) {

        await editName(user.name, name);
        
        //actualizar localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        storedUser.name = name;
        localStorage.setItem("user", JSON.stringify(storedUser));
        changes = true;
      }

      if (email !== user.email) {
        await editEmail(user.email, email);
        changes = true;
      }

      if (image !== user.image) {
        await editImage(user.name, image);
        changes = true;
      }

      //si ha habido algun cambio hacemos alert y recargamos
      if(changes){
        alert("Perfil actualizado correctamente");
        //recargar para ver cambios 
        window.location.reload();
      }

      onClose(); //cerrar modal automaticamente

    } catch (error) {
      alert(error.message);
    }
  };

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
          Editar Perfil
        </h2>

        <div className="flex flex-col gap-5">

          {/* NOMBRE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">
              Nombre de usuario
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-filmBlack p-3 rounded outline-none text-white"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-filmBlack p-3 rounded outline-none text-white"
            />
          </div>

          {/* IMAGEN */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">
              URL de la imagen de perfil
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-filmBlack p-3 rounded outline-none text-white"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-filmGold text-black font-bold py-3 rounded-lg mt-4 hover:opacity-90 transition"
          >
            GUARDAR CAMBIOS
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;