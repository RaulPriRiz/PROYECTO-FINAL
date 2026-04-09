import React from "react";
import { Link } from "react-router-dom";
import spotlight from "../assets/lights.png";
import { useState } from "react";
import { registerUser } from "../data/userApi";
import { useNavigate } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); //pa navegar

  const handleRegister = async () => {
    
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
        rol: "REGISTRADO",
      });

      navigate("/"); 

    } catch (error) {
      alert(error.message);
    }
  };

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
          <h1 className="text-filmGold text-5xl font-serif leading-tight">
            JUEGA
          </h1>
          <h1 className="text-filmGold text-5xl font-serif leading-tight">
            FILMWISE AL
          </h1>
          <h1 className="text-filmGold text-5xl font-serif leading-tight">
            COMPLETO
          </h1>
        </div>

        <div className="w-full flex flex-col gap-8">

          <div className="text-left">
            <label className="text-white text-sm">Escribe un correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none text-white py-2"
            />
          </div>

          <div className="text-left">
            <label className="text-white text-sm">
              Escribe tu nombre de usuario
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none text-white py-2"
            />
          </div>

          <div className="text-left">
            <label className="text-white text-sm">
              Escribe una contraseña (mín. 8 caracteres)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none text-white py-2"
            />
          </div>

          <div className="text-left">
            <label className="text-white text-sm">
              Confirma la contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none text-white py-2"
            />
          </div>

          <button
            onClick={handleRegister}
            className="bg-filmGold text-filmBlack font-semibold py-3 rounded-lg hover:opacity-90 transition mt-4">
            REGISTRARSE
          </button>

          <Link
            to="/"
            className="text-filmGold underline text-sm mt-2"
          >
            Atrás
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Register;