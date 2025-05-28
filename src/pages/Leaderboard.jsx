import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import Contributors from "../components/Contributors";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import Tabulation from "./Tabulation";

const generateLeaderboard = ({ data, view, week, month, category }) => {
  const getScoreArray = (userEntries) => {
    if (!Array.isArray(userEntries)) return [];

    if (view === "weekly") {
      const weeks = groupByWeeks(userEntries);
      const index = week === "Current Week" ? 0 : week === "Last Week" ? 1 : 2;
      return weeks[index] || [];
    }

    if (view === "monthly") {
      return userEntries.filter((entry) => entry.month === month);
    }

    return [];
  };

  const result = [];

  for (const user in data) {
    const rawEntries = data[user] || [];
    const filtered = getScoreArray(rawEntries);

    if (!filtered.length) continue;

    const total = filtered.reduce((sum, e) => sum + (e.score || 0), 0);
    const avg = (total / filtered.length).toFixed(2);
    const highest = filtered.reduce((a, b) => (a.score > b.score ? a : b), {
      score: 0,
    });
    const lowest = filtered.reduce((a, b) => (a.score < b.score ? a : b), {
      score: 10,
    });

    result.push({
      name: user,
      total,
      avg,
      count: filtered.length,
      highest,
      lowest,
    });
  }

  if (category.toLowerCase() === "sleep hour") {
    result.sort((a, b) => a.total - b.total); // Lower is better
  } else {
    result.sort((a, b) => b.total - a.total); // Higher is better
  }

  return result.map((entry, index) => ({ ...entry, rank: index + 1 }));
};

const groupByWeeks = (entries) => {
  const chunks = [];
  for (let i = entries.length; i >= 7; i -= 7) {
    chunks.unshift(entries.slice(i - 7, i));
  }
  return chunks;
};

const crownIcons = ["👑", "🥈", "🥉"];
const profileImages = {
  "Md. Saminul Amin": "/members/samin.jpg",
  "Wazih Abdullah": "/members/wazih.jpg",
  Towheduzzaman: "/members/sahab.jpg",
  Sahabuddin: "/members/sahab.jpg",
  "Thowfiqur Bari Chowdhury": "/members/thowfiq.jpg",
};

const Leaderboard = () => {
  const [userData, setUserData] = useState(null);
  const [category, setCategory] = useState("Productivity");
  const [view, setView] = useState("weekly");
  const [week, setWeek] = useState("Current Week");
  const [month, setMonth] = useState("May");
  const [celebrate, setCelebrate] = useState(false);
  const [showTable, setShowTable] = useState(false);

  let url;
  if (category === "Productivity") {
    url = "/productivity";
  } else if (category === "Islamic Studies") {
    url = "/islamic-studies";
  } else if (category === "Early Masjid") {
    url = "/early-masjid";
  } else if (category === "Sleep Hour") {
    url = "/sleep-hour";
  }
  url += ".json";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.allUserDummyData);
      });
  }, [category]);

  const leaderboard = userData
    ? generateLeaderboard({
        data: userData,
        view,
        week,
        month,
        category,
      })
    : [];

  const topThree = leaderboard.slice(0, 3);

  const rankColors = [
    "bg-yellow-400 text-gray-900", // 🥇 Gold
    "bg-gray-300 text-gray-900", // 🥈 Silver
    "bg-amber-700 text-white", // 🥉 Bronze
  ];

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-12 py-10 px-4 relative overflow-hidden">
      {celebrate && <Confetti recycle={false} numberOfPieces={500} />}

      <h1 className="text-4xl font-bold text-center mb-8 text-pink-400">
        Leaderboard
      </h1>

      <div className="flex flex-wrap gap-4 justify-center my-12">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option>Productivity</option>
          <option>Islamic Studies</option>
          <option>Early Masjid</option>
          <option>Sleep Hour</option>
        </select>

        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        {view === "weekly" ? (
          <select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option>Current Week</option>
            <option>Last Week</option>
            <option>Week before the Last Week</option>
          </select>
        ) : (
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
          </select>
        )}
      </div>

      <div className="max-w-3xl mx-auto grid gap-6">
        {topThree.map((entry, index) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`p-5 rounded-xl shadow-lg grid grid-cols-3 gap-12 items-center ${rankColors[index]}`}
          >
            <div className="">
              <img
                src={profileImages[entry.name] || "/leaders/default.jpg"}
                alt={entry.name}
                className="w-24 h-24 rounded-full border-4 border-white mb-2 mx-auto"
              />
            </div>
            <div className="col-span-2">
              <h2 className="text-2xl font-bold">
                {crownIcons[index]} #{entry.rank} - {entry.name}
              </h2>
              <p className="mt-1 text-sm">
                Total: {entry.total} | Avg: {entry.avg}
              </p>
              <p className="text-xs mt-1">
                <span className="font-semibold">Highest:</span>{" "}
                {entry.highest.score} on {entry.highest.month}{" "}
                {entry.highest.date}
              </p>
              <p className="text-xs">
                <span className="font-semibold">Lowest:</span>{" "}
                {entry.lowest.score} on {entry.lowest.month} {entry.lowest.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setCelebrate(true)}
          className="bg-pink-500 hover:bg-pink-600 transition text-white cursor-pointer font-bold px-6 py-2 rounded-xl"
        >
          🎉 Celebrate
        </button>
      </div>

      <div className="text-center mt-24">
        <button
          onClick={() => setShowTable(!showTable)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium cursor-pointer flex items-center gap-2 mx-auto"
        >
          <span>📋 View Full Tabulation</span>
          <span
            className={`transition-transform duration-300 ${
              showTable ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {showTable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Tabulation data={leaderboard} />
          </motion.div>
        )}
      </AnimatePresence>

      <Contributors />
    </div>
  );
};

export default Leaderboard;
