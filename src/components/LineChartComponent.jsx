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

export default function LineChartComponent({
  user,
  week,
  category,
  isMonthly,
}) {
  const [userData, setUserData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [domain, setDomain] = useState(null);

  let url;
  if (category === "Productivity") {
    url = "/productivity";
  } else if (category === "Islamic Studies") {
    url = "/islamic-studies";
  } else if (category === "Early Masjid") {
    url = "/early-masjid";
  } else {
    url = "/sleep-hour";
  }
  url += ".json";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.allUserDummyData);
        if (category === "Productivity") {
          setDomain(10);
        } else if (category === "Islamic Studies") {
          setDomain(3);
        } else if (category === "Early Masjid") {
          setDomain(5);
        } else {
          setDomain(10);
        }
      })
      .catch((err) => {
        console.error("Error Fetching Data!");
        setUserData([]);
      });
  }, [category]);

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
  // console.log(weeklyData);

  let monthlyData = dummyData.filter((entry) => entry.month === "May");

  useEffect(() => {
    const newData = isMonthly ? monthlyData : weeklyData;
    if (JSON.stringify(newData) !== JSON.stringify(showData)) {
      setShowData(newData);
    }
  }, [isMonthly, weeklyData, monthlyData, showData]);
  console.log(showData);

  return (
    <div>
      <div className="bg-gray-800 p-4 rounded-xl shadow mb-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2 text-center">
          Daily Line Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={showData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" domain={[0, domain]} />
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
