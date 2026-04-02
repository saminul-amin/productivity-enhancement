import MixBarChartComponent from "./MixBarChartComponent";
import LineChartComponent from "./LineChartComponent";
import BarChartComponent from "./BarChartComponent";
import Loading from "./Loading";
import NoData from "./NoData";

const ChartSwitcher = ({
  isLoading,
  category,
  showData,
  user,
  domain,
  barSize,
  isMonthly,
  week,
}) => {
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
