import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import React from "react";
const SalesChart = () => {
  const chartoptions = {
    series: [
      {
        name: "Personne Atteint",
        data: [0, 31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Personne Non Atteint",
        data: [0, 11, 32, 45, 32, 34, 52, 41],
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
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Avr",
          "Mai",
          "Juin",
          "Juil",
          "Aout",
        ],
      },
    },
  };
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
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
