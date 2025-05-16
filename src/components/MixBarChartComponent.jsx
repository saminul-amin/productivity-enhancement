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

const data = [
  {
    day: "Thu",
    productivity: 5,
    islamic: 2,
    sleep: 7,
  },
  {
    day: "Fri",
    productivity: 3,
    islamic: 3,
    sleep: 6,
  },
  {
    day: "Sat",
    productivity: 4,
    islamic: 5,
    sleep: 8,
  },
  {
    day: "Sun",
    productivity: 6,
    islamic: 4,
    sleep: 6,
  },
  {
    day: "Mon",
    productivity: 8,
    islamic: 2,
    sleep: 7,
  },
  {
    day: "Tue",
    productivity: 6,
    islamic: 4,
    sleep: 5,
  },
  {
    day: "Wed",
    productivity: 5,
    islamic: 3,
    sleep: 6,
  },
];

const MixBarChartComponent = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow max-w-4xl mx-auto">
      <h2 className="text-center text-xl font-semibold text-white mb-4">
        Productivity VS Sleep Hour
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
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
