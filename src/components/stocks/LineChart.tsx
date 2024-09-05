// src/components/LineChartComponent.tsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: { x: number; y: number }[];
}

const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
