import React from "react";
import spotlight from "../assets/lights.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-filmBlack flex items-center justify-center relative overflow-hidden">

      <img
        src={spotlight}
        alt="spotlight left"
        className="absolute bottom-0 left-0 w-56 md:w-72 opacity-80"
      />

      <img
        src={spotlight}
        alt="spotlight right"
        className="absolute bottom-0 right-0 w-56 md:w-72 scale-x-[-1] opacity-80"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-md">

        <div className="mb-12">
          <h1 className="text-filmGold text-6xl font-serif leading-tight">
            FILM
          </h1>
          <h1 className="text-filmGold text-6xl font-serif leading-tight">
            WISE
          </h1>

          <p className="text-filmGold mt-3 tracking-widest text-sm">
            LA SABIDURÍA DEL CINE
          </p>
        </div>

        <div className="w-full flex flex-col gap-8">

          <div className="text-left">
            <label className="text-white text-sm">Correo:</label>
            <input
              type="email"
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none text-white py-2"
            />
          </div>

          <div className="text-left">
            <label className="text-white text-sm">Contraseña:</label>
            <input
              type="password"
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none text-white py-2"
            />
          </div>

          <button className="bg-filmGold text-filmBlack font-semibold py-3 rounded-lg hover:opacity-90 transition">
            INICIAR SESIÓN
          </button>

          <div className="text-sm text-filmGold">
            ¿No estás registrado?{" "}
            <Link to="/register" className="underline cursor-pointer">
              Regístrate ya
            </Link>
          </div>

          <div className="text-sm text-filmGold underline cursor-pointer">
            Jugar como invitado
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;

