import React, { useEffect, useState } from "react";
import "./chart.scss";
import { Chart } from "chart.js";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import useUserContext from "../../hooks/useUserContext";
import { useOrderContext } from "../../context/OrderContext";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2000 },
  { name: "March", Total: 2000 },
  { name: "April", Total: 900 },
  { name: "May", Total: 800 },
  { name: "June", Total: 1500 },
  { name: "July", Total: 1200 },
];

export const ChartHome = () => {
  const { accessToken } = useUserContext();
  const { getAllOrders } = useOrderContext();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrders(accessToken)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [getAllOrders]);

  // Filter orders within the past 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const filteredData = orders.filter(
    (order) => new Date(order.checkInDate) >= sixMonthsAgo
  );

  // Group the filtered orders by month and calculate the sum of finalAmount
  const monthlyFinalAmounts = filteredData.reduce((acc, order) => {
    const month = new Date(order.checkInDate).toLocaleString("default", {
      month: "short",
    });
    if (acc[month]) {
      acc[month] += order.finalAmount;
    } else {
      acc[month] = order.finalAmount;
    }
    return acc;
  }, {});
  // Prepare the data for the chart
  const chartData = Object.keys(monthlyFinalAmounts).map((month) => ({
    month,
    finalAmount: monthlyFinalAmounts[month]
  }));

 // Sort the chartData by month in ascending order (most recent month on the right)
 chartData.sort((a, b) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return months.indexOf(a.month) - months.indexOf(b.month);
});

  return (
    <div className="chart">
      <div className="title">Previous months (Revenue)</div>
       <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="20%" stopColor="#8884d8" stopOpacity={0.9} />
              <stop offset="80%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="gray" />
          {/* <YAxis /> */}
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="finalAmount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer> 

    </div>
  );
};
