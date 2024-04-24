import React, {useState, useEffect, useRef, useCallback} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon, FeatureGroup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PopUpDetallePlaga from "./Popups/PopUpDetallePlaga";

function MapView() {

  const mapRef = useRef(null);

  const polyline = [
    [-5.84509, -79.81689],
    [-5.84659, -79.81601],
    [-5.84595, -79.81507],
    [-5.84496, -79.81563],
    [-5.84441, -79.81594],
    [-5.84509, -79.81689],
  ]

  const polylinePlaga = [
    [-5.84708, -79.81311],
    [-5.84644, -79.81224],
    [-5.84812, -79.81132],
    [-5.84875, -79.81219],
    [-5.84708, -79.81311],
  ]

  const polylineAplicacion = [
    [
        [-5.84574, -79.81134],
        [-5.84511, -79.81041],
        [-5.84686, -79.80945],
        [-5.84749, -79.81035],
        [-5.84574, -79.81134],
    ],
  ]
  
  const normal = { color: 'black' }
  const leve = { color: 'green' }
  const medio = { color: 'orange' }
  const grave = { color: 'red' }
  const [showDetallePlaga, setShowDetallePlaga] = React.useState(false);

  function getIconPesticide(){
    return L.icon({
        iconUrl: require('../assets/pestControl.png'),
        iconSize: new L.Point(30,30),
    })
  }

  const handleOpen = () => {
    setShowDetallePlaga(true);
  }

  return (
    <div class="leaflet-container">
        <PopUpDetallePlaga
          show={showDetallePlaga}
          setShow={setShowDetallePlaga}
          titulo={"Arañita Roja"}
        />
        <MapContainer center={[-5.84509, -79.81689]} zoom={15} scrollWheelZoom={false} sx={{height: 10}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <FeatureGroup pathOptions={normal}>
            <Popup>
              <b>Lote 001</b><br/>
              <Divider sx={{ mt: 1, mb: 1 }}/>
              <b>Cultivo:</b> <br/>
              <b>Variedad:</b> <br/>
              <b>Área sembrada: </b> <br/>
              <b>N° plantas:</b> <br/>
              <b>N° surcos:</b> <br/>
            </Popup>
            <Polygon pathOptions={normal} positions={polyline} />
          </FeatureGroup>
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
                console.log(centro);
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