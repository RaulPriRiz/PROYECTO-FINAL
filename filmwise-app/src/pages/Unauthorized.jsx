import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-filmBlack flex flex-col items-center justify-center text-white px-6 text-center">

      <h1 className="text-4xl md:text-5xl font-bold text-filmGold mb-6">
        ACCESO NO AUTORIZADO
      </h1>

      <p className="text-gray-300 mb-10">
        No tienes permisos para acceder a esta página
      </p>

      <button
        onClick={() => navigate(-1)}
        className="bg-filmRed px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition"
      >
        ATRÁS
      </button>

    </div>
  );
}

export default Unauthorized;