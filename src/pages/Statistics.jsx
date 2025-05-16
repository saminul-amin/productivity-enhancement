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
import LineChartComponent from "../components/LineChartComponent";
import BarChartComponent from "../components/BarChartComponent";

const Statistics = () => {
  const [category, setCategory] = useState("productivity");
  const [user, setUser] = useState("Md. Saminul Amin");
  const [month, setMonth] = useState("May");
  const [week, setWeek] = useState("Current Week");
  const [weekButton, setWeekButton] = useState(true);
  const [monthButton, setMonthButton] = useState(false);
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
  const weeks = ["Week before last week", "Last Week", "Current Week"];

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
          value={monthButton ? month : week}
          onChange={(e) => {
            if (monthButton) setMonth(e.target.value);
            else setWeek(e.target.value);
          }}
          className="p-2 rounded bg-gray-800 text-white"
        >
          {monthButton
            ? months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))
            : weeks.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
        </select>

        <button
          onClick={() => navigate("/compare")}
          className="bg-pink-700 hover:bg-pink-600 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer border-2 border-gray-900 hover:border-pink-600 hover:font-bold transition"
        >
          Compare
        </button>
      </div>

      {/* Weekly / Monthly Toggle */}
      <div className="mb-16 flex gap-4 justify-center">
        <button
          onClick={() => {
            setWeekButton(true);
            setMonthButton(false);
          }}
          className={`text-white px-4 py-2 rounded cursor-pointer ${
            weekButton ? "bg-pink-700" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => {
            setMonthButton(true);
            setWeekButton(false);
          }}
          className={`text-white px-4 py-2 rounded cursor-pointer ${
            monthButton ? "bg-pink-700" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Line Chart */}
      <LineChartComponent user={user} week={week} />

      {/* Bar Chart */}
      <BarChartComponent user={user} week={week} />
    </div>
  );
};

export default Statistics;

{
  /* <div className="bg-gray-800 p-4 rounded-xl shadow mb-6 max-w-4xl mx-auto">
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
      </div> */
}

{
  /* <div className="bg-gray-800 p-4 rounded-xl shadow max-w-4xl mx-auto">
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
      </div> */
}
