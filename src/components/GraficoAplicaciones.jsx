import React from 'react';
import dayjs from "dayjs";
import { LineChart } from '@mui/x-charts/LineChart';
import { listarAplicacionesXCampañaXFundo, listarEvaluacionesXCampañaXFundo } from '../services/adminService';

function GraficoAplicaciones({rowsTable, setRowsTable, semana, setSemana, campaña, setCampaña, fundo, setFundo}) {
    const fechaInicio = "2024-06-01"
  

    var week = dates(new Date(fechaInicio));
    const xAxisData = week;
  
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
  
    let [evaluaciones, setEvaluaciones] = React.useState([]);
    const getEvaluaciones = (data) => {
      listarAplicacionesXCampañaXFundo(data).then((response) => {
        if(response?.data){
            if(response?.data.Aplicacion){
              let aux = [];
              for(let i = 0; i < response?.data?.Aplicacion?.length; i++){
                  aux.push({
                    nombrePesticida: response?.data.Aplicacion[i].nombrePesticida,
                    cantidades: response?.data.Aplicacion[i].cantidades,
                })
              }
              console.log(aux)
              let data= []
              for (let j=0; j<aux.length; j++){
                let auxEval = [0,0,0,0,0,0,0];
                for(let i = 0; i<aux[j].cantidades.length; i++){
                  let index = week.findIndex(obj => obj.getDate() === new Date (aux[j].cantidades[i].fecha).getDate() )
                  auxEval[index] += 1
                }
                let auxData = {
                  label: aux[j].nombrePesticida,
                  data: auxEval
                }
                data.push(auxData)
              }
              setEvaluaciones(data);
              evaluaciones = data;
              console.log(evaluaciones);
            }
          }
        })
    }
  
    React.useEffect(() => {
      let data = {
        idFundo: fundo,
        idCampaña: campaña,
        semana: semana,
      }
      getEvaluaciones(data);
    },[])
    React.useEffect(() => {
      let data = {
        idFundo: fundo,
        idCampaña: campaña,
        semana: semana,
      }
      getEvaluaciones(data);
      
    },[semana, fundo, campaña])
  
    function dates(current) {
      var week= new Array(); 
      // Starting Monday not Sunday
      current.setDate((current.getDate()+7*(semana-1) +1));
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
          yAxis={[{ label: "Aplicaciones" }]}
          series={evaluaciones}
          
          width={1100}
          height={500}
          
        />
      </div>
    )
}

export default GraficoAplicaciones