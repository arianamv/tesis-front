import React, {useState, useEffect, useRef, useCallback} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon, FeatureGroup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PopUpDetallePlaga from "./Popups/PopUpDetallePlaga";
import { listarLoteXFundo } from "../services/adminService";


function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

function MapView({fundo, lotes, plagas, cultivos, fundos, evaluaciones, selectedFundo, setSelectedFundo, selectedSemana, uvaCheck, paltaCheck, aranCheck}) {

  const mapRef = useRef(null);

  const polyline = []

  const polylinePlaga = []

  const polylineAplicacion = []
  
  const normal = { color: 'black' }
  const leve = { color: 'green' }
  const medio = { color: 'orange' }
  const grave = { color: 'red' }
  const [showDetallePlaga, setShowDetallePlaga] = React.useState(false);
  let [coords, setCoords] = React.useState([0,0]);
  let [lote, setLote] = React.useState(-1);
  let [evaluacion, setEvaluacion] = React.useState(-1);

  function getIconPesticide(){
    return L.icon({
        iconUrl: require('../assets/pestControl.png'),
        iconSize: new L.Point(30,30),
    })
  }
  const handleOpen = (e, found) => {
    setEvaluacion(found)
    setLote(e)
    setShowDetallePlaga(true);
  }

  React.useEffect(() => {
    console.log("map fundos", fundos)
    var filterData = fundos?.filter(item => item.idFundo.toString().includes(fundo));
    setSelectedFundo(filterData);
    selectedFundo = filterData;
    console.log("FILTER", selectedFundo)
    setCoords([selectedFundo[0].latitud, selectedFundo[0].longitud])
    coords = [selectedFundo[0]?.latitud, selectedFundo[0]?.longitud]
  }, [])

  React.useEffect(() => {
    var filterData = fundos?.filter(item => item.idFundo.toString().includes(fundo));
    setSelectedFundo(filterData);
    selectedFundo = filterData;
    console.log("FILTER", selectedFundo)
    setCoords([selectedFundo[0].latitud, selectedFundo[0].longitud])
    coords = [selectedFundo[0]?.latitud, selectedFundo[0]?.longitud]
    console.log("COORDS", coords);
  }, [fundo])


  const getColor = (e) => {
    let found;
    if (e === undefined) found = 0;
    else found = e.gravedad;
    switch(found) {
      case 0: 
        return 'black';
      case 1: 
        return 'green';
      case 2: 
        return 'orange';
      case 3: 
        return 'red';
    }
  }

  return (
    <div class="leaflet-container">
      <PopUpDetallePlaga
        show={showDetallePlaga}
        setShow={setShowDetallePlaga}
        lote={lote}
        evaluacion={evaluacion}
      />
        <MapContainer center={coords} zoom={15} scrollWheelZoom={false} sx={{height: 10}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick coords={coords} />
        {lotes?.map((e) => {
          let coordenadas = []
          for (let i=0; i<e.coordenadas.length; i++){
            coordenadas.push([
              e?.coordenadas[i]?.latitud, e?.coordenadas[i]?.longitud
            ])
          }
          const found = evaluaciones.find(({ idCampañaXLote, semana }) => idCampañaXLote === e.idCampañaXLote && semana === selectedSemana);
          
          const color = {
            color: getColor(found)
          }
          const flag = typeof found !== 'object';
          if(!flag)
          return cultivos.map((cultivo) => {
            return plagas.map((plaga) => {
              if(plaga.checked && cultivo.checked)
                return (found.idPlaga === plaga.idPlaga && e.idCultivo === cultivo.idCultivo) && (
                  <FeatureGroup pathOptions={color}>
                  <Popup>
                    <b>{e.nombreLote}</b><br/>
                    <Divider sx={{ mt: 1, mb: 1 }}/>
                    <b>Cultivo:</b> {e.nombreCultivo}<br/>
                    <b>Variedad:</b> {e.nombreVariedad}<br/>
                    <b>Área sembrada: </b> {e.tamanio} <br/>
                    <b>N° plantas:</b> {e.numPlantas}<br/>
                    <b>N° surcos:</b> {e.numSurcos}<br/>
                    <Button size="small" variant="contained" sx={{ backgroundColor: '#074F57', mt: 1, mb: 1, display: flag ? 'none': undefined  }} onClick={() => handleOpen(e, found)} >Detalle Plaga</Button>
                  </Popup>
                  <Polygon pathOptions={color} positions={coordenadas} />
                  </FeatureGroup>
                )
            })
          })
          else
          return cultivos.map((cultivo) => {
            if (flag && cultivo.checked)
              return (e.idCultivo === cultivo.idCultivo) && (
                <FeatureGroup pathOptions={color}>
                  <Popup>
                    <b>{e.nombreLote}</b><br/>
                    <Divider sx={{ mt: 1, mb: 1 }}/>
                    <b>Cultivo:</b> {e.nombreCultivo}<br/>
                    <b>Variedad:</b> {e.nombreVariedad}<br/>
                    <b>Área sembrada: </b> {e.tamanio} <br/>
                    <b>N° plantas:</b> {e.numPlantas}<br/>
                    <b>N° surcos:</b> {e.numSurcos}<br/>
                    <Button size="small" variant="contained" sx={{ backgroundColor: '#074F57', mt: 1, mb: 1, display: flag ? 'none': undefined  }} onClick={() => handleOpen(e, found)} >Detalle Plaga</Button>
                  </Popup>
                  <Polygon pathOptions={color} positions={coordenadas} />
                  </FeatureGroup>
              )
          });
        })}
        </MapContainer>
    </div>
  )
}

export default MapView