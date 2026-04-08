import { Link } from "react-router";

function MovieCard({ title, image }) {
  return (
    <Link to={`/details/${title}`}>
      <div className="w-40 sm:w-52 md:w-80 bg-black">

        <img
          src={image}
          alt={title}
          className="w-full h-44 sm:h-52 md:h-80 object-cover"/>

        <div className="bg-[#2b2b2b] text-center py-2">
          <h3 className="text-xs">{title}</h3>
        </div>

      </div>
    </Link>
  );
}

export default MovieCard;