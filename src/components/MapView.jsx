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

function MapView({fundo, lotes, fundoObject}) {

  const mapRef = useRef(null);

  const polyline = []

  const polylinePlaga = []

  const polylineAplicacion = []
  
  const normal = { color: 'black' }
  const leve = { color: 'green' }
  const medio = { color: 'orange' }
  const grave = { color: 'red' }
  const [showDetallePlaga, setShowDetallePlaga] = React.useState(false);
  let coords = [fundoObject?.latitud, fundoObject?.longitud]

  function getIconPesticide(){
    return L.icon({
        iconUrl: require('../assets/pestControl.png'),
        iconSize: new L.Point(30,30),
    })
  }

  

  const handleOpen = () => {
    setShowDetallePlaga(true);
  }

  React.useEffect(() => {
    coords = [fundoObject.latitud, fundoObject.longitud]
  }, [fundoObject])

  return (
    <div class="leaflet-container">
        <PopUpDetallePlaga
          show={showDetallePlaga}
          setShow={setShowDetallePlaga}
          titulo={"Arañita Roja"}
        />
        <MapContainer center={coords} zoom={15} scrollWheelZoom={false} sx={{height: 10}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick coords={coords} />
        {lotes?.map((e) => {
          console.log(lotes)
          let coordenadas = []
          for (let i=0; i<e.coordenadas.length; i++){
            coordenadas.push([
              e.coordenadas[i].latitud, e.coordenadas[i].longitud
            ])
          }
          if(e.gravedad === 0)
          return  (
            <FeatureGroup pathOptions={normal}>
            <Popup>
              <b>{e.nombreLote}</b><br/>
              <Divider sx={{ mt: 1, mb: 1 }}/>
              <b>Cultivo:</b> {e.nombreCultivo}<br/>
              <b>Variedad:</b> {e.nombreVariedad}<br/>
              <b>Área sembrada: </b> {e.tamanio} <br/>
              <b>N° plantas:</b> {e.numPlantas}<br/>
              <b>N° surcos:</b> {e.numSurcos}<br/>
            </Popup>
            <Polygon pathOptions={normal} positions={coordenadas} />
            </FeatureGroup>
          )
          if(e.gravedad === 1)
          return (
            <FeatureGroup pathOptions={leve}>
            <Popup>
            <b>{e.nombreLote}</b><br/>
              <Divider sx={{ mt: 1, mb: 1 }}/>
              <b>Cultivo:</b> {e.nombreCultivo}<br/>
              <b>Variedad:</b> {e.nombreVariedad}<br/>
              <b>Área sembrada: </b> {e.tamanio} <br/>
              <b>N° plantas:</b> {e.numPlantas}<br/>
              <b>N° surcos:</b> {e.numSurcos}<br/>
              <Button size="small" variant="contained" sx={{ backgroundColor: '#074F57', mt: 1, mb: 1 }} onClick={handleOpen} >Detalle Plaga</Button>
            </Popup>
            <Polygon pathOptions={leve} positions={coordenadas} />
          </FeatureGroup>
          )
          if(e.gravedad === 2)
          return (
            <FeatureGroup pathOptions={medio}>
            <Popup>
            <b>{e.nombreLote}</b><br/>
              <Divider sx={{ mt: 1, mb: 1 }}/>
              <b>Cultivo:</b> {e.nombreCultivo}<br/>
              <b>Variedad:</b> {e.nombreVariedad}<br/>
              <b>Área sembrada: </b> {e.tamanio} <br/>
              <b>N° plantas:</b> {e.numPlantas}<br/>
              <b>N° surcos:</b> {e.numSurcos}<br/>
              <Button size="small" variant="contained" sx={{ backgroundColor: '#074F57', mt: 1, mb: 1 }} onClick={handleOpen} >Detalle Plaga</Button>
            </Popup>
            <Polygon pathOptions={medio} positions={coordenadas} />
          </FeatureGroup>
          )
          if(e.gravedad === 3)
          return (
            <FeatureGroup pathOptions={grave}>
            <Popup>
            <b>{e.nombreLote}</b><br/>
              <Divider sx={{ mt: 1, mb: 1 }}/>
              <b>Cultivo:</b> {e.nombreCultivo}<br/>
              <b>Variedad:</b> {e.nombreVariedad}<br/>
              <b>Área sembrada: </b> {e.tamanio} <br/>
              <b>N° plantas:</b> {e.numPlantas}<br/>
              <b>N° surcos:</b> {e.numSurcos}<br/>
              <Button size="small" variant="contained" sx={{ backgroundColor: '#074F57', mt: 1, mb: 1 }} onClick={handleOpen} >Detalle Plaga</Button>
            </Popup>
            <Polygon pathOptions={grave} positions={coordenadas} />
          </FeatureGroup>
          )
        })}
          
          <FeatureGroup pathOptions={grave}>
            <Popup>
              <b>Lote 001</b><br/>
              <Divider sx={{ mt: 1, mb: 1 }}/>
              <b>Cultivo:</b> <br/>
              <b>Variedad:</b> <br/>
              <b>Área sembrada: </b> <br/>
              <b>N° plantas:</b> <br/>
              <b>N° surcos:</b> <br/>
              <Button size="small" variant="contained" sx={{ backgroundColor: '#074F57', mt: 1, mb: 1 }} onClick={handleOpen} >Detalle Plaga</Button>
            </Popup>
            <Polygon pathOptions={grave} positions={polylinePlaga} />
          </FeatureGroup>
          {
            polylineAplicacion.map((lote, index) => {
                var loteAplicacion = L.polygon(lote);
                var centro = loteAplicacion.getBounds().getCenter();
                return(
                  <FeatureGroup pathOptions={medio}>
                    <Popup>
                      <b>Lote 001</b><br/>
                      <Divider sx={{ mt: 1, mb: 1 }}/>
                        <b>Cultivo:</b> <br/>
                        <b>Variedad:</b> <br/>
                        <b>Área sembrada: </b> <br/>
                        <b>N° plantas:</b> <br/>
                        <b>N° surcos:</b> <br/>
                        <Button size="small" variant="contained" sx={{ backgroundColor: '#074F57', mt: 1, mb: 1 }} >Detalle Aplicación</Button>
                    </Popup>
                    <Polygon pathOptions={medio} positions={lote} />
                    <Marker position={centro} icon={getIconPesticide()}/>
                  </FeatureGroup>
                )
            })
          }
        </MapContainer>
    </div>
  )
}

export default MapView