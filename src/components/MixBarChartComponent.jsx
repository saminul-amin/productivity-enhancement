import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MixBarChartComponent = ({ user, isMonthly, week }) => {
  const [allData, setAllData] = useState({});
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    const safeFetch = async (url) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return await res.json();
      } catch (err) {
        console.error(`Error fetching ${url}:`, err.message);
        return null;
      }
    };

    const fetchAllData = async () => {
      const [productivityData, islamicData, sleepData] = await Promise.all([
        safeFetch("/productivity.json"),
        safeFetch("/islamic-studies.json"),
        safeFetch("/sleep-hour.json"),
      ]);

      setAllData({
        productivity: productivityData,
        islamic: islamicData,
        sleep: sleepData,
      });
    };

    fetchAllData();
  }, []);
  console.log(allData);

  const productivity = allData?.productivity?.allUserDummyData?.[user] || [];
  const islamic = allData?.islamic?.allUserDummyData?.[user] || [];
  const sleep = allData?.sleep?.allUserDummyData?.[user] || [];

  const combinedData = productivity.map((entry, index) => {
    const { score, ...rest } = entry;
    return {
      ...rest,
      productivity: score,
      islamic: islamic[index]?.score ?? 0,
      sleep: sleep[index]?.score ?? 0,
    };
  });
  console.log(combinedData);

  function groupByWeeks(data) {
    const weeks = [];
    for (let i = data.length; i >= 7; i -= 7) {
      weeks.push(data.slice(i - 7, i));
    }
    return weeks;
  }

  const weeklyChunks = groupByWeeks(combinedData);
  let weeklyData = [];
  if (week === "Current Week") {
    weeklyData = weeklyChunks[0];
  } else if (week === "Last Week") {
    weeklyData = weeklyChunks[1];
  } else {
    weeklyData = weeklyChunks[2];
  }

  let monthlyData = combinedData.filter((entry) => entry.month === "May");

  useEffect(() => {
    const newData = isMonthly ? monthlyData : weeklyData;
    if (JSON.stringify(newData) !== JSON.stringify(showData)) {
      setShowData(newData);
    }
  }, [isMonthly, weeklyData, monthlyData, showData]);

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow max-w-4xl mx-auto">
      <h2 className="text-center text-xl font-semibold text-white mb-4">
        Productivity VS Sleep Hour
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={showData}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" domain={[0, 12]} />
          <Tooltip />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Bar
            dataKey="productivity"
            stackId="a"
            fill="#60a5fa"
            name="Productivity"
          />
          <Bar
            dataKey="islamic"
            stackId="a"
            fill="#f59e0b"
            name="Islamic Studies"
          />
          <Bar dataKey="sleep" fill="#f472b6" name="Sleep Hour" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MixBarChartComponent;
