import React, { useState, useEffect } from 'react';
import leaflet from './leafletLoader.js';
import './map.scss';


const Map = () => {
  const [map, setMap] = useState(null);
  const [mapManager, setMapManager] = useState(null);

  useEffect(() => {
    if (!mapManager) {
      leaflet
      .then(result => {
        setMap(result.map('map').setView([51.505, -0.09], 13));
        setMapManager(result);
      })
      .catch(e => console.log(e));
    } else {
      // mapManager.tileLayer(
      //   `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, 
      //   {
      //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //     maxZoom: 18,
      //     id: 'mapbox/streets-v11',
      //     tileSize: 512,
      //     zoomOffset: -1,
      //     accessToken: process.env.M_API_KEY
      //   }
      // ).addTo(map);
    }
  }, [mapManager]);

  return (
    <div id="map"></div>
  );
}

export default Map;