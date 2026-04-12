import React from "react";

const EditProfileModal = ({ isOpen, onClose, user }) => {

  if (!isOpen) return null;

  const userName = user ? user.name : "Nombre de usuario no encontrado";
  const userEmail = user ? user.email : "Correo electrónico del usuario no encontrado";
  const userImage = user?.image ? user.image : "Url de la imagen de perfil del usuario no encontrada";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-filmGray w-[90%] md:w-[500px] rounded-2xl p-6 relative">

        {/* BOTON CERRAR */}
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
              defaultValue={userName}
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
              defaultValue={userEmail}
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
              defaultValue={userImage}
              className="bg-filmBlack p-3 rounded outline-none text-white"
            />
          </div>

          <button className="bg-filmGold text-black font-bold py-3 rounded-lg mt-4 hover:opacity-90 transition">
            GUARDAR CAMBIOS
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;