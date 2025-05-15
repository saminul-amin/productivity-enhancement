import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const [category, setCategory] = useState("productivity");
  const [user, setUser] = useState("Md. Saminul Amin");
  const [month, setMonth] = useState("January");
  const navigate = useNavigate();

  const categories = [
    "Productivity",
    "Early Masjid",
    "Islamic Studies",
    "Sleep Hour",
  ];
  const users = [
    "Md. Saminul Amin",
    "Wazih Abdullah",
    "Towheduzzaman",
    "Sahabuddin",
    "Ahnaf Tahmid Rhythm",
    "Thowfiqur Bari Chowdhury",
    "Md. Shakibul Alam",
    "Al Fuad Nur",
    "Siam Ahmed",
    "Zubayer Hossain Uday",
    "Masum Billah",
  ];
  const months = ["January", "February", "March", "April", "May"];

  const allUserDummyData = {
    "Md. Saminul Amin": [
      { day: "Fri", score: 8 },
      { day: "Sat", score: 7 },
      { day: "Sun", score: 6 },
      { day: "Mon", score: 5 },
      { day: "Tue", score: 8 },
      { day: "Wed", score: 4 },
      { day: "Thu", score: 0 },
    ],
    "Wazih Abdullah": [
      { day: "Mon", score: 2 },
      { day: "Tue", score: 1 },
      { day: "Wed", score: 0 },
      { day: "Thu", score: 3 },
      { day: "Fri", score: 3.5 },
      { day: "Sat", score: 4 },
      { day: "Sun", score: 0 },
    ],
    Towheduzzaman: [
      { day: "Mon", score: 7 },
      { day: "Tue", score: 8 },
      { day: "Wed", score: 9 },
      { day: "Thu", score: 9 },
      { day: "Fri", score: 0 },
      { day: "Sat", score: 10 },
      { day: "Sun", score: 0 },
    ],
    Sahabuddin: [
      { day: "Mon", score: 0 },
      { day: "Tue", score: 2 },
      { day: "Wed", score: 8 },
      { day: "Thu", score: 9 },
      { day: "Fri", score: 7 },
      { day: "Sat", score: 10 },
      { day: "Sun", score: 0 },
    ],
    "Ahnaf Tahmid Rhythm": [
      { day: "Mon", score: 1 },
      { day: "Tue", score: 2 },
      { day: "Wed", score: 1 },
      { day: "Thu", score: 1 },
      { day: "Fri", score: 0.5 },
      { day: "Sat", score: 1 },
      { day: "Sun", score: 0 },
    ],
    "Thowfiqur Bari Chowdhury": [
      { day: "Mon", score: 0 },
      { day: "Tue", score: 7 },
      { day: "Wed", score: 10 },
      { day: "Thu", score: 0 },
      { day: "Fri", score: 0 },
      { day: "Sat", score: 0 },
      { day: "Sun", score: 0 },
    ],
    "Md. Shakibul Alam": [
      { day: "Mon", score: 0 },
      { day: "Tue", score: 1 },
      { day: "Wed", score: 0 },
      { day: "Thu", score: 1 },
      { day: "Fri", score: 1 },
      { day: "Sat", score: 1 },
      { day: "Sun", score: 0 },
    ],
    "Al Fuad Nur": [
      { day: "Mon", score: 5 },
      { day: "Tue", score: 8 },
      { day: "Wed", score: 2 },
      { day: "Thu", score: 0 },
      { day: "Fri", score: 0 },
      { day: "Sat", score: 0 },
      { day: "Sun", score: 0 },
    ],
    "Siam Ahmed": [
      { day: "Mon", score: 2 },
      { day: "Tue", score: 1 },
      { day: "Wed", score: 0 },
      { day: "Thu", score: 3 },
      { day: "Fri", score: 3.5 },
      { day: "Sat", score: 4 },
      { day: "Sun", score: 0 },
    ],
    "Zubayer Hossain Uday": [
      { day: "Mon", score: 6 },
      { day: "Tue", score: 5 },
      { day: "Wed", score: 5 },
      { day: "Thu", score: 6 },
      { day: "Fri", score: 4 },
      { day: "Sat", score: 0.5 },
      { day: "Sun", score: 0 },
    ],
    "Masum Billah": [
      { day: "Mon", score: 3 },
      { day: "Tue", score: 2 },
      { day: "Wed", score: 0 },
      { day: "Thu", score: 4 },
      { day: "Fri", score: 3 },
      { day: "Sat", score: 5 },
      { day: "Sun", score: 0 },
    ],
  };

  const dummyData = allUserDummyData[user];

  return (
    <div className="p-6 text-gray-200 min-h-screen bg-gray-900">
      <h2 className="text-4xl font-bold mb-12 text-center">Total Statistics</h2>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mb-6 max-w-5xl mx-auto">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          {users.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <button
          onClick={() => navigate("/compare")}
          className="bg-pink-700 hover:bg-pink-600 text-white font-semibold rounded px-4 py-2 cursor-pointer"
        >
          Compare
        </button>
      </div>

      {/* Weekly / Monthly Toggle */}
      <div className="mb-16 flex gap-4 justify-center">
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
          Weekly
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
          Monthly
        </button>
      </div>

      {/* Line Chart */}
      <div className="bg-gray-800 p-4 rounded-xl shadow mb-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Daily Line Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#f472b6"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 p-4 rounded-xl shadow max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Daily Bar Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="score"
              fill="#f472b6"
              barSize={50}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
