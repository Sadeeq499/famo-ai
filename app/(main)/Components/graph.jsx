import React, { Fragment, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgChartsReact } from "ag-charts-react";

const ChartExample = () => {
  const [options, setOptions] = useState({
    title: {
      text: "Sales by Month",
    },
    data: getData(),
    series: [
      {
        type: "area",
        xKey: "month",
        yKey: "subscriptions",
        yName: "Subscriptions",
        stacked: true,
      },
      {
        type: "area",
        xKey: "month",
        yKey: "services",
        yName: "Services",
        stacked: true,
      },
      {
        type: "area",
        xKey: "month",
        yKey: "products",
        yName: "Products",
        stacked: true,
      },
    ],
  });

  return <AgChartsReact options={options} />;
};
