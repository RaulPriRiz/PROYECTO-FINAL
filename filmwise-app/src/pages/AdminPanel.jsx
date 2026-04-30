import { useState } from "react";
import Navbar from "../components/Navbar";
import AdminUsers from "../components/admin/AdminUsers";
import AdminFilms from "../components/admin/AdminFilms";

function AdminPanel() {

    const [section, setSection] = useState("users");

    return (
        <div className="bg-filmBlack min-h-screen text-white pt-24">

            <Navbar />

            <div className="px-10">

                <div className="flex gap-6 mb-10">
                    <button onClick={() => setSection("users")}>
                        Usuarios
                    </button>

                    <button onClick={() => setSection("films")}>
                        Películas
                    </button>
                </div>

                {section === "users" && <AdminUsers />}
                {section === "films" && <AdminFilms />}

            </div>
        </div>
    );
}

export default AdminPanel;