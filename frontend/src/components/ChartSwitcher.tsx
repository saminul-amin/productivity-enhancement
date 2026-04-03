import MixBarChartComponent from "./MixBarChartComponent";
import LineChartComponent from "./LineChartComponent";
import BarChartComponent from "./BarChartComponent";
import Loading from "./Loading";
import NoData from "./NoData";
import type { ScoreEntry } from "@/types";

interface ChartSwitcherProps {
  isLoading: boolean;
  category: string;
  showData: ScoreEntry[];
  user: string;
  domain: number | null;
  barSize: number;
  isMonthly: boolean;
  week: string;
}

const ChartSwitcher = ({
  isLoading,
  category,
  showData,
  user,
  domain,
  barSize,
  isMonthly,
  week,
}: ChartSwitcherProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (category === "Productivity VS Sleep") {
    return (
      <MixBarChartComponent user={user} isMonthly={isMonthly} week={week} />
    );
  }

  if (!showData || showData.length === 0) {
    return <NoData />;
  }

  return (
    <>
      <LineChartComponent
        data={showData}
        domain={domain}
        isMonthly={isMonthly}
      />
      <BarChartComponent
        data={showData}
        domain={domain}
        barSize={barSize}
        isMonthly={isMonthly}
      />
    </>
  );
};

export default ChartSwitcher;
