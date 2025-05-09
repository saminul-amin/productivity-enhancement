import React from "react";
import { Link } from "react-router-dom";
import { Crown, BarChart2, Users } from "lucide-react";

const Home = () => {
  return (
    <main className="p-6 md:px-12 md:pt-12">
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
        <h2 className="text-2xl font-bold text-gray-300 flex items-center justify-center gap-2 mb-4">
          <Crown className="text-yellow-500" />
          Winner of the Week
        </h2>
        <div className="flex flex-col items-center gap-3">
          <img
            src="/images/current-winner.jpg"
            alt="Weekly Winner"
            className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md"
          />
          <h3 className="text-xl font-semibold text-gray-300">
            Md. Saminul Amin
          </h3>
          <p className="text-gray-300">
            🏆 5-time winner | Current streak: 2 weeks
          </p>
        </div>
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
          to="/timeline"
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
        <Link
          to="/hall-of-shame"
          className="bg-gray-900 bg-gradient-to-b from-gray-800 hover:bg-gray-700 transition shadow-md rounded-2xl p-6 flex items-center gap-4"
        >
          <div className="w-8 h-8 bg-gray-800 text-red-600 text-2xl rounded-full flex items-center justify-center">
            💩
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-300">Hall of Shame</h4>
            <p className="text-gray-400 text-sm">
              See the least active weeks (for fun & reflection)
            </p>
          </div>
        </Link>

        {/* Donate Card */}
        <Link
          to="/donate"
          className="bg-gray-900 bg-gradient-to-b from-gray-800 hover:bg-gray-700 transition shadow-md rounded-2xl p-6 flex items-center gap-4"
        >
          <div className="w-8 h-8 bg-gray-800 text-pink-700 text-3xl rounded-full flex items-center justify-center">
            💖
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-300">Donate</h4>
            <p className="text-gray-400 text-sm">
              Support our mission to boost productivity
            </p>
          </div>
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-400">
        Made with ☕ by the Community
      </footer>
    </main>
  );
};

export default Home;
