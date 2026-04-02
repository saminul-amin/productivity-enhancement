import { Link } from "react-router-dom";
import { Crown, BarChart2, Users } from "lucide-react";
import { useState } from "react";
import UnderDevModal from "../components/UnderDevModal";
import Noticeboard from "../components/Noticeboard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/element/css/autoplay"

const winners = [
  {
    name: "Sahabuddin",
    image: "/members/sahab.jpg",
    category: "Productivity",
    streak: "🏆 1-time winner | Current streak: 1 week",
  },
  {
    name: "Md. Saminul Amin",
    image: "/members/samin.jpg",
    category: "Islamic Studies",
    streak: "🏆 1-time winner | Current streak: 1 week",
  },
  {
    name: "Al Fuad Nur",
    image: "/members/nur.jpg",
    category: "Early Masjid",
    streak: "🏆 1-time winner | Current streak: 1 week",
  },
  {
    name: "Md. Saminul Amin",
    image: "/members/samin.jpg",
    category: "Sleep Hour",
    streak: "🏆 1-time winner | Current streak: 1 week",
  },
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="p-6 md:px-12 md:pt-12 mt-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4">
          Productivity Enhancement Community
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Track weekly champions, celebrate consistency, and stay motivated
          together.
        </p>
      </section>

      {/* Winner of the Week */}
      <section className="bg-gray-900 bg-gradient-to-b from-gray-800 shadow-xl rounded-2xl p-6 md:p-10 mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-300 flex items-center justify-center gap-2 mb-6">
          <Crown className="text-yellow-500" />
          Winners of the Week
        </h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          modules={[Autoplay]}
        >
          {winners.map((winner, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md"
                />
                <h3 className="text-xl font-semibold text-gray-300">
                  {winner.name}
                </h3>
                <p className="text-gray-300">{winner.streak}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Sections Preview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Link
          to="/leaderboard"
          className="bg-gray-900 bg-gradient-to-b from-gray-800 hover:bg-gray-700 transition shadow-md rounded-2xl p-6 flex items-center gap-4"
        >
          <BarChart2 className="w-8 h-8 text-indigo-600" />
          <div>
            <h4 className="text-lg font-bold text-gray-300">Leaderboard</h4>
            <p className="text-gray-400 text-sm">
              See the top performers of all time
            </p>
          </div>
        </Link>

        <Link
          to="/statistics"
          className="bg-gray-900 bg-gradient-to-b from-gray-800 hover:bg-gray-700 transition shadow-md rounded-2xl p-6 flex items-center gap-4"
        >
          <Users className="w-8 h-8 text-green-600" />
          <div>
            <h4 className="text-lg font-bold text-gray-300">Statistics</h4>
            <p className="text-gray-400 text-sm">
              Explore winners from previous weeks
            </p>
          </div>
        </Link>

        {/* Hall of Shame Card */}
        <button
          // to="/hall-of-shame"
          onClick={() => setShowModal(true)}
          className="bg-gray-900 bg-gradient-to-b from-gray-800 hover:bg-gray-700 transition shadow-md rounded-2xl p-6 flex items-center gap-4 cursor-pointer"
        >
          <div className="w-8 h-8 bg-gray-800 text-red-600 text-2xl rounded-full flex items-center justify-center">
            💩
          </div>
          <div>
            <h4 className="text-lg text-left font-bold text-gray-300">
              Hall of Shame
            </h4>
            <p className="text-gray-400 text-sm">
              See the least active weeks (for fun & reflection)
            </p>
          </div>
        </button>

        {/* Donate Card */}
        <button
          // to="/donate"
          onClick={() => setShowModal(true)}
          className="bg-gray-900 bg-gradient-to-b from-gray-800 hover:bg-gray-700 transition shadow-md rounded-2xl p-6 flex items-center gap-4 cursor-pointer"
        >
          <div className="w-8 h-8 bg-gray-800 text-pink-700 text-3xl rounded-full flex items-center justify-center">
            💖
          </div>
          <div>
            <h4 className="text-lg text-left font-bold text-gray-300">
              Donate
            </h4>
            <p className="text-gray-400 text-sm">
              Support our mission to boost productivity
            </p>
          </div>
        </button>
      </section>
      <Noticeboard />

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-400">
        Made with ☕ by the Community
      </footer>
      <UnderDevModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
};

export default Home;
