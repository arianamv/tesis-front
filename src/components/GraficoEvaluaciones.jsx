import React from 'react';
import dayjs from "dayjs";
import { LineChart } from '@mui/x-charts/LineChart';

function GraficoEvaluaciones({rowsTable, setRowsTable, semana, setSemana}) {
  const xAxisData = [
    new Date("2024-06-01"),
    new Date("2024-06-02"),
    new Date("2024-06-03"),
    new Date("2024-06-04"),
    new Date("2024-06-05"),
    new Date("2024-06-06"),
    new Date("2024-06-07"),
  ];

  function dates(current) {
    var week= new Array(); 
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() +1));
    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        ); 
        current.setDate(current.getDate() +1);
    }
    return week; 
  }

  return (
    <div>
      <LineChart
        xAxis={[
            {
              label: "Fecha",
              data: xAxisData,
              tickInterval: xAxisData,
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("DD/MM"),
            },
          ]}
        yAxis={[{ label: "Cantidad encontrada" }]}
        series={[
            {
            data: [1, 1, 0, 1, 1, 1],
            },
        ]}
        
        width={1100}
        height={500}
        
      />
    </div>
  )
}

export default GraficoEvaluaciones