import { useState } from "react";
import Navbar from "../components/Navbar";
import AdminUsers from "../components/admin/AdminUsers";
import AdminFilms from "../components/admin/AdminFilms";

function AdminPanel() {

    const [section, setSection] = useState("users");

    return (
        <div className="bg-filmBlack min-h-screen text-white pt-24">

            <Navbar />

            <div className="px-4 md:px-10">

                {/* NAV SECCIONES */}
                <div className="flex justify-center mb-10">
                    <div className="flex gap-2 bg-[#1f1f1f] p-2 rounded-xl">

                        <button
                            onClick={() => setSection("users")}
                            className={`px-4 py-2 rounded-lg transition ${section === "users"
                                    ? "bg-filmGold text-black font-semibold"
                                    : "opacity-70 hover:opacity-100"
                                }`}
                        >
                            Usuarios
                        </button>

                        <button
                            onClick={() => setSection("films")}
                            className={`px-4 py-2 rounded-lg transition ${section === "films"
                                    ? "bg-filmGold text-black font-semibold"
                                    : "opacity-70 hover:opacity-100"
                                }`}
                        >
                            Películas
                        </button>

                    </div>
                </div>

                {section === "users" && <AdminUsers />}
                {section === "films" && <AdminFilms />}

            </div>
        </div>
    );
}

export default AdminPanel;