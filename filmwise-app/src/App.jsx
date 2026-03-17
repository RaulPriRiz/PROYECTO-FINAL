<<<<<<< HEAD
import Login from "./pages/login";
import Home from "./pages/home";

function App() {
  return <Home />;
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> main
}

export default App;