import { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Personne Atteint",
        data: [],
      },
      {
        name: "Personne Non Atteint",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/prediction-summary");
      const data = await response.json();

      // Structuration des données pour le graphique
      const positiveCounts = data.map((item) => item.positive_count);
      const negativeCounts = data.map((item) => item.negative_count);
      const dates = data.map((item) => item.date.slice(0, 10)); // Formate la date (yyyy-mm-dd)

      setChartData({
        series: [
          {
            name: "Personne Atteint",
            data: positiveCounts,
          },
          {
            name: "Personne Non Atteint",
            data: negativeCounts,
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            categories: dates,
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Résumé des prédictions</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Durant les 8 derniers mois
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartData.options}
          series={chartData.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;

