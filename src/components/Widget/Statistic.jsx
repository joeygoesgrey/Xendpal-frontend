import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";
import { getyearlyUsage } from "../../utils/utils";

// Helper Functions
const monthNumberToName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[Math.floor(monthNumber) - 1];
};

const bytesToMBorGB = (bytes) => {
  const kilobytes = bytes / 1024;
  const megabytes = kilobytes / 1024;

  return megabytes.toFixed(2); // Assuming you want the data in MB for the chart
};

Chart.register();

function Statistic({ ...props }) {
  const [yearlyData, setYearlyData] = React.useState(null);

  React.useEffect(() => {
    getyearlyUsage()
      .then((response) => {
        // Apply helper functions to transform data
        const monthNames = response.month.map(monthNumberToName);
        const usageData = response.usage.map(bytesToMBorGB);

        setYearlyData({ month: monthNames, usage: usageData });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const data = {
    labels: yearlyData ? yearlyData.month : ["No Data"],
    datasets: [
      {
        label: "Yearly Usage (MB)",
        data: yearlyData
          ? yearlyData.usage
          : ["0", "0", "0", "0", "0", "0", "0"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
  };

  return (
    <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
      <h1 className="text-medium font-semibold pb-4">Cloud Consumption</h1>
      <div className="">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic;
