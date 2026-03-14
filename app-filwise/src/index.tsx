// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import UserList from "./components/Prueba.tsx"; // tu componente principal
import "./index.css";    // estilos globales, opcional

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserList />
  </React.StrictMode>
);