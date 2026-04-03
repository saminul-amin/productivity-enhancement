"use client";

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
import type { CombinedEntry } from "@/types";

interface MixBarChartComponentProps {
  user: string;
  isMonthly: boolean;
  week: string;
}

interface FetchedCategoryData {
  allUserDummyData: Record<string, { month: string; date: string; day: string; score: number }[]>;
}

interface AllFetchedData {
  productivity: FetchedCategoryData | null;
  islamic: FetchedCategoryData | null;
  sleep: FetchedCategoryData | null;
}

const MixBarChartComponent = ({ user, isMonthly, week }: MixBarChartComponentProps) => {
  const [allData, setAllData] = useState<AllFetchedData>({ productivity: null, islamic: null, sleep: null });
  const [showData, setShowData] = useState<CombinedEntry[]>([]);

  useEffect(() => {
    const safeFetch = async (url: string): Promise<FetchedCategoryData | null> => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return await res.json();
      } catch (err) {
        console.error(`Error fetching ${url}:`, (err as Error).message);
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

  const productivity = allData?.productivity?.allUserDummyData?.[user] || [];
  const islamic = allData?.islamic?.allUserDummyData?.[user] || [];
  const sleep = allData?.sleep?.allUserDummyData?.[user] || [];

  const combinedData: CombinedEntry[] = productivity.map((entry, index) => {
    const { score, ...rest } = entry;
    return {
      ...rest,
      productivity: score,
      islamic: islamic[index]?.score ?? 0,
      sleep: sleep[index]?.score ?? 0,
    };
  });

  function groupByWeeks(data: CombinedEntry[]): CombinedEntry[][] {
    const weeks: CombinedEntry[][] = [];
    for (let i = data.length; i >= 7; i -= 7) {
      weeks.push(data.slice(i - 7, i));
    }
    return weeks;
  }

  const weeklyChunks = groupByWeeks(combinedData);
  let weeklyData: CombinedEntry[] = [];
  if (week === "Current Week") {
    weeklyData = weeklyChunks[0];
  } else if (week === "Last Week") {
    weeklyData = weeklyChunks[1];
  } else {
    weeklyData = weeklyChunks[2];
  }

  const monthlyData = combinedData.filter((entry) => entry.month === "May");

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
          <XAxis dataKey={isMonthly ? "date" : "day"} stroke="#ccc" />
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
