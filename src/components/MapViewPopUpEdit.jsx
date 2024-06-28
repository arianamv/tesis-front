import React, {useState, useEffect, useRef, useCallback} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon, FeatureGroup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PopUpDetallePlaga from "./Popups/PopUpDetallePlaga";
import { listarLoteXFundo } from "../services/adminService";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";


function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

function EditTool({coordenadas, setCoordenadas, selectedLote, setSelectedLote}){
  const _edited = (e) => {
    e.layers.eachLayer(a => {
      console.log(a)
      setSelectedLote(a._latlngs[0])
      selectedLote = a._latlngs[0]
  });
  }
  return(
    <FeatureGroup>
      <EditControl
          position="topright"
          onEdited={_edited}
          edit={{ remove: false }}
          draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: false,
          }}
      />
      <Polygon pathOptions={{color: '#00d2ff'}} positions={coordenadas} />;
  </FeatureGroup>
  )
}

function MapViewPopUp({fundo, lotes, fundos, selectedFundo, setSelectedFundo, row, coordenadas, setCoordenadas, tamanio, setTamanio}) {

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  });

    const mapRef = useRef(null);

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
      var filterData = fundos?.filter(item => item.idFundo.toString().includes(fundo));
      setSelectedFundo(filterData);
      selectedFundo = filterData;
      setCoords([selectedFundo[0].latitud, selectedFundo[0].longitud])
      coords = [selectedFundo[0]?.latitud, selectedFundo[0]?.longitud]
    }, [])

    
  
    React.useEffect(() => {
      var filterData = fundos?.filter(item => item.idFundo.toString().includes(fundo));
      setSelectedFundo(filterData);
      selectedFundo = filterData;
      setCoords([selectedFundo[0].latitud, selectedFundo[0].longitud])
      coords = [selectedFundo[0]?.latitud, selectedFundo[0]?.longitud]
    }, [fundo])

    let [selectedLote, setSelectedLote] = React.useState("");

    React.useEffect(() => {
      let newCoordenadas = []
      if (selectedLote !== ""){
        selectedLote.map((coordenada, index) => {
          let newCoordenada = {
            idCoordenada: row.coordenadas[index].idCoordenada,
            latitud: coordenada.lat, 
            longitud: coordenada.lng, 
            estado: 1,  
            Lote_Fundo_idFundo: fundo,
          }
          newCoordenadas.push(newCoordenada);
        })
      }
      var seeArea = L.GeometryUtil.geodesicArea(selectedLote);
      console.log("AREA",seeArea)
      setTamanio(seeArea)
      setCoordenadas(newCoordenadas)
      console.log("COORD",newCoordenadas)
    }, [selectedLote])

    const [selectedCoordenada, setSelectedCoordenada] = React.useState([]);
  
    return (
      <div class="leaflet-container">
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
            return e.idLote !== row.idLote ? (
                <Polygon pathOptions={{color: 'black'}} positions={coordenadas} />
              ) : (
                <EditTool
                  coordenadas={coordenadas}
                  setCoordenadas={setCoordenadas}
                  selectedLote={selectedLote}
                  setSelectedLote={setSelectedLote}
                />
              )
            })
          }
          </MapContainer>
      </div>
    )
}

export default MapViewPopUp