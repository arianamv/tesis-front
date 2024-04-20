import React, {useState, useEffect, useRef, useCallback} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import L from 'leaflet';
import { Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';


function MapView() {
  return (
    <div class="leaflet-container">
        <MapContainer center={[-14.0677700, -75.7286100]} zoom={13} scrollWheelZoom={false} sx={{height: 10}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>
    </div>
  )
}

export default MapView