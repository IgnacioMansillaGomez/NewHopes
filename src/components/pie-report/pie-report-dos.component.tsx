import React, { PureComponent } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

export const PieReportDos = (props: any) => {
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
        fill="#38669c"
        label
      />
      <Tooltip />
    </PieChart>
  );
};
