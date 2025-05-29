import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const allUsernames = [
  "Md. Saminul Amin",
  "Wazih Abdullah",
  "Towheduzzaman",
  "Sahabuddin",
  "Thowfiqur Bari Chowdhury",
  "Md. Shakibul Alam",
  "Ahnaf Tahmid Rhythm",
  "Zubayer Hossain Uday",
  "Siam Ahmed",
  "Masum Billah",
  "Al Fuad Nur",
];

const Compare = () => {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [highlightedIndex1, setHighlightedIndex1] = useState(-1);
  const [highlightedIndex2, setHighlightedIndex2] = useState(-1);
  const [category, setCategory] = useState("Productivity");
  const [view, setView] = useState("weekly");
  const [weekOption, setWeekOption] = useState("current");
  const [monthOption, setMonthOption] = useState("May");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, [category, user1, user2]);

  const getSuggestions = (input) => {
    return allUsernames.filter((name) =>
      name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleInput1 = (e) => {
    setUser1(e.target.value);
    setSuggestions1(getSuggestions(e.target.value));
    setHighlightedIndex1(-1);
  };

  const handleInput2 = (e) => {
    setUser2(e.target.value);
    setSuggestions2(getSuggestions(e.target.value));
    setHighlightedIndex2(-1);
  };

  const handleKeyDown1 = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex1((prev) =>
        Math.min(prev + 1, suggestions1.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex1((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex1 >= 0) {
      setUser1(suggestions1[highlightedIndex1]);
      setSuggestions1([]);
      setHighlightedIndex1(-1);
    } else if (e.key === "Enter" && suggestions1.length > 0) {
      setUser1(suggestions1[0]);
      setSuggestions1([]);
      setHighlightedIndex1(-1);
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex2((prev) =>
        Math.min(prev + 1, suggestions2.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex2((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex2 >= 0) {
      setUser2(suggestions2[highlightedIndex2]);
      setSuggestions2([]);
      setHighlightedIndex2(-1);
    } else if (e.key === "Enter" && suggestions2.length > 0) {
      setUser2(suggestions2[0]);
      setSuggestions2([]);
      setHighlightedIndex2(-1);
    }
  };

  const isValid = userData && userData[user1] && userData[user2];

  const getFilteredData = () => {
    if (!isValid) return [];

    const full1 = userData[user1] || [];
    const full2 = userData[user2] || [];

    let data1 = full1;
    let data2 = full2;

    if (view === "weekly") {
      const chunks = (arr) => [
        arr.slice(-7),
        arr.slice(-14, -7),
        arr.slice(-21, -14),
      ];
      const [curr, last, prev] = chunks(full1);
      if (weekOption === "current") data1 = curr;
      else if (weekOption === "last") data1 = last;
      else data1 = prev;

      const [curr2, last2, prev2] = chunks(full2);
      if (weekOption === "current") data2 = curr2;
      else if (weekOption === "last") data2 = last2;
      else data2 = prev2;
    } else {
      data1 = full1.filter((d) => d.month === monthOption);
      data2 = full2.filter((d) => d.month === monthOption);
    }

    return data1.map((entry, idx) => ({
      day: entry.day,
      date: entry.date,
      [user1]: entry.score,
      [user2]: data2[idx]?.score ?? 0,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 mt-12">
      <h1 className="text-3xl font-bold text-center text-pink-400 mb-6">
        ⚔️ Compare Performances
      </h1>

      {loading ? (
        <div className="flex justify-center mt-10">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                value={user1}
                onChange={handleInput1}
                onKeyDown={handleKeyDown1}
                placeholder="Enter first user"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
              />
              {suggestions1.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-700 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {suggestions1.map((s, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setUser1(s);
                        setSuggestions1([]);
                        setHighlightedIndex1(-1);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-600 ${
                        highlightedIndex1 === idx ? "bg-gray-600" : ""
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative w-full max-w-xs">
              <input
                type="text"
                value={user2}
                onChange={handleInput2}
                onKeyDown={handleKeyDown2}
                placeholder="Enter second user"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
              />
              {suggestions2.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-700 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {suggestions2.map((s, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setUser2(s);
                        setSuggestions2([]);
                        setHighlightedIndex2(-1);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-600 ${
                        highlightedIndex1 === idx ? "bg-gray-600" : ""
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded border border-gray-700"
            >
              <option value="Productivity">Productivity</option>
              <option value="Islamic Studies">Islamic Studies</option>
              <option value="Sleep Hour">Sleep Hour</option>
              <option value="Early Masjid">Early Masjid</option>
            </select>

            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded border border-gray-700"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            {view === "weekly" ? (
              <select
                value={weekOption}
                onChange={(e) => setWeekOption(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded border border-gray-700"
              >
                <option value="current">Current Week</option>
                <option value="last">Last Week</option>
                <option value="previous">Week Before Last</option>
              </select>
            ) : (
              <select
                value={monthOption}
                onChange={(e) => setMonthOption(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded border border-gray-700"
              >
                <option value="May">May</option>
                {/* Add more months as needed */}
              </select>
            )}
          </div>

          {isValid ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getFilteredData()}>
                  <XAxis
                    dataKey={view === "weekly" ? "day" : "date"}
                    stroke="#ccc"
                  />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={user1}
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey={user2}
                    stroke="#f472b6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getFilteredData()}>
                  <XAxis dataKey={view === "weekly" ? "day" : "date"} stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={user1} fill="#34d399" radius={[4, 4, 0, 0]} />
                  <Bar dataKey={user2} fill="#f472b6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <p className="text-center text-sm text-gray-400">
              Select two valid users to compare.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Compare;
