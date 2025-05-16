import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LineChartComponent({ user, week }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("/productivity.json")
      .then((res) => res.json())
      .then((data) => setUserData(data.allUserDummyData))
      .catch((err) => {
        console.error("Error Fetching Data!");
        setUserData([]);
      });
  }, []);

  const dummyData = userData?.[user] ?? [];

  function groupByWeeks(data) {
    const weeks = [];
    for (let i = data.length; i >= 7; i -= 7) {
      weeks.push(data.slice(i - 7, i));
    }
    return weeks;
  }

  const weeklyChunks = groupByWeeks(dummyData);
  let weeklyData = [];
  if (week === "Current Week") {
    weeklyData = weeklyChunks[0];
  } else if (week === "Last Week") {
    weeklyData = weeklyChunks[1];
  } else {
    weeklyData = weeklyChunks[2];
  }
  console.log(weeklyData);

  return (
    <div>
      <div className="bg-gray-800 p-4 rounded-xl shadow mb-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2 text-center">
          Daily Line Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
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
              name="Hours"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
