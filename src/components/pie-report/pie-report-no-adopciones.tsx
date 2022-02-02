import React from "react";

import { PieChart, Pie, Tooltip, Cell } from "recharts";

export const PieReportNoAdopciones = (props: any) => {
  const { data } = props;

  const generarLetra = () => {
    let letras = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let numero: string | any = (Math.random() * 15).toFixed(0);
    return letras[numero];
  };

  const colorHEX = () => {
    let coolor = "";
    for (let i = 0; i < 6; i++) {
      coolor = coolor + generarLetra();
    }
    return "#" + coolor;
  };

  return (
    <PieChart width={400} height={400} style={{ margin: "auto" }}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill={`${colorHEX()}`}
        label
      />
      {data.map((input: any, index: any) => {
        <Cell key={`cell-${index}`} />;
      })}
      <Tooltip />
    </PieChart>
  );
};
