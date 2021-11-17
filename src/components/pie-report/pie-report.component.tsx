import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

export const PieReport = (props: any) => {
  const { data } = props;
  return (
    <PieChart width={400} height={400} style={{ margin: "auto" }}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
};
