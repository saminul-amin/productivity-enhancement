import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarChartComponent({
  data,
  barSize,
  domain,
  isMonthly,
}) {
  return (
    <div>
      <div className="bg-gray-800 p-4 rounded-xl shadow max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2 text-center">
          Daily Bar Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey={isMonthly ? "date" : "day"} stroke="#ccc" />
            <YAxis stroke="#ccc" domain={[0, domain]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="score"
              fill="#f472b6"
              barSize={barSize}
              radius={[4, 4, 0, 0]}
              name="Hours"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
