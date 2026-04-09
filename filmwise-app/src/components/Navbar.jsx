import { useNavigate, useLocation } from "react-router-dom";

import homeIcon from "../assets/home.svg";
import movieIcon from "../assets/movie.svg";
import profileIcon from "../assets/profile.svg";
import competitionIcon from "../assets/competition.svg";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItem = (path, icon) => (
        <button
            onClick={() => navigate(path)}
            className={`flex flex-col items-center justify-center ${isActive(path) ? "opacity-100" : "opacity-60"
                }`}
        >
            <img src={icon} className="w-7 h-7" />
        </button>
    );

    return (
        <>

            {/* HEADER SOLO MOVIL */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-filmBlack px-4 py-3 z-50 border-b border-filmGray">
                <h1 className="text-filmGold text-2xl font-serif">
                    FILMWISE
                </h1>
            </div>

            {/* Vista movil (abajo) */}
            <div className="fixed bottom-0 left-0 w-full bg-filmGray flex justify-around py-3 md:hidden z-50">
                {navItem("/home", homeIcon)}
                {navItem("/movies", movieIcon)}
                {navItem("/competition", competitionIcon)}
                {navItem("/profile", profileIcon)}
            </div>

            {/* Vista PC (arriba) */}
            <div className="hidden md:flex fixed top-0 left-0 w-full bg-filmBlack px-10 py-4 justify-between items-center z-50">

                <h1 className="text-filmGold text-2xl font-serif">
                    FILMWISE
                </h1>

                <div className="flex gap-10">
                    {navItem("/home", homeIcon)}
                    {navItem("/movies", movieIcon)}
                    {navItem("/competition", competitionIcon)}
                    {navItem("/profile", profileIcon)}
                </div>
            </div>
        </>
    );
};

export default Navbar;