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

export default function LineChartComponent({ data, domain, isMonthly }) {
  return (
    <div>
      <div className="bg-gray-800 p-4 rounded-xl shadow mb-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2 text-center">
          Daily Line Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey={isMonthly ? "date" : "day"} stroke="#ccc" />
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
