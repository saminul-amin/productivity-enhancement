import { useEffect, useState } from "react";

import LineChartComponent from "../components/LineChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import MixBarChartComponent from "../components/MixBarChartComponent";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import ChartSwitcher from "../components/ChartSwitcher";

const Statistics = () => {
  const [category, setCategory] = useState("Productivity");
  const [user, setUser] = useState("Md. Saminul Amin");
  const [month, setMonth] = useState("May");
  const [week, setWeek] = useState("Current Week");

  const [isLoading, setIsLoading] = useState(true);
  const [weekButton, setWeekButton] = useState(true);
  const [monthButton, setMonthButton] = useState(false);

  const [fetchedData, setFetchedData] = useState([]);
  const [showData, setShowData] = useState([]);

  const [barSize, setBarSize] = useState(50);
  const [domain, setDomain] = useState(null);

  const categories = [
    "Productivity",
    "Early Masjid",
    "Islamic Studies",
    "Sleep Hour",
    "Productivity VS Sleep",
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
    setIsLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data.allUserDummyData);
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
        setFetchedData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  const userData = fetchedData?.[user] ?? [];
  

  function groupByWeeks(data) {
    const weeks = [];
    for (let i = data.length; i >= 7; i -= 7) {
      weeks.push(data.slice(i - 7, i));
    }
    return weeks;
  }

  useEffect(() => {
    if (!userData || userData.length === 0) {
      setShowData([]);
      return;
    }

    const weeklyChunks = groupByWeeks(userData);

    let newWeeklyData = [];
    if (week === "Current Week") {
      newWeeklyData = weeklyChunks[0] || [];
    } else if (week === "Last Week") {
      newWeeklyData = weeklyChunks[1] || [];
    } else {
      newWeeklyData = weeklyChunks[2] || [];
    }

    const newMonthlyData = userData.filter((entry) => entry.month === month);

    const newData = monthButton ? newMonthlyData : newWeeklyData;

    if (JSON.stringify(newData) !== JSON.stringify(showData)) {
      setShowData(newData);
    }

    setBarSize(monthButton ? 30 : 50);
  }, [monthButton, week, month, userData, showData]);
  if (isLoading) {
    return <Loading />;
  }

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

        <button className="bg-pink-700 hover:bg-pink-600 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer border-2 border-gray-900 hover:border-pink-600 hover:font-bold transition">
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
      <ChartSwitcher
        isLoading={isLoading}
        category={category}
        showData={showData}
        user={user}
        domain={domain}
        barSize={barSize}
        isMonthly={monthButton}
        week={week}
      />
    </div>
  );
};

export default Statistics;
