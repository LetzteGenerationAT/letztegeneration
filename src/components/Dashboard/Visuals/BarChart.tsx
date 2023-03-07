import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Store 1",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Store 2",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };

  return (
    <div className="card mt-6 h-80 w-full bg-base-100 p-6 shadow">
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Bar options={options} data={data} />
      }
    </div>
  );
}
