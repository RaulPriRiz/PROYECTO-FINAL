import Navbar from "../components/Navbar";

function Profile() {
  return (
    <div className="bg-filmBlack min-h-screen text-white flex items-center justify-center pt-24 pb-24">

      <Navbar />

      <h1 className="text-3xl md:text-5xl font-bold text-filmGold">
        PROFILE
      </h1>

    </div>
  );
}

export default Profile;