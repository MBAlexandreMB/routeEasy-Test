import React, { useState, useEffect } from 'react';
import leaflet from './leafletLoader.js';
import './map.scss';


const Map = ({data, selectedMarker}) => {
  const [map, setMap] = useState(null);
  const [mapManager, setMapManager] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [fGroup, setFGroup] = useState(null);

    // Load Leaflet
    useEffect(() => {
      if (!mapManager) {
        leaflet
        .then(result => {
          const map = result.map('map');
          resetView(map);
          setMap(map);
          setMapManager(result);
        })
        .catch(e => console.log(e));
      } else {
        mapManager.tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, 
          {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: process.env.M_API_KEY
          }
        ).addTo(map);
      }
    }, [mapManager]);
  
  // Fit view to marker
  useEffect(() => {
    if (map && selectedMarker) {
      const marker = markers.find(marker => {
        return (
          selectedMarker.latitude === marker._latlng.lat &&
          selectedMarker.longitude === marker._latlng.lng
          );
      });

      if (marker) {
        const bounds = new mapManager.LatLngBounds();
        bounds.extend(marker.getLatLng());
        map.fitBounds(bounds);
      }
    }
  }, [selectedMarker, map]);

  // Add markers if there's data
  useEffect(() => {
    clearMarkers();

    if (data && data.length > 0 && mapManager) {
      const newMarkers = [];
      const bounds = new mapManager.LatLngBounds();
      const options = {
        keyboard: true,
        riseOnHover: true,
      };

      data.map(delivery => {
        const { 
          street, number, district,
          city, state, country,
          location, complement
        } = delivery.address;
        const { latitude, longitude } = location;
        options.title = delivery.clientName;

        // Set marker with informative popup
        const marker = mapManager.marker([latitude, longitude], options)
        .bindPopup(`
        <strong>Cliente:</strong> ${delivery.clientName} 
        <br>
        <strong>Peso:</strong> ${delivery.weightInKg}kg
        <br><br>
        ${street ? `${street},` : ''} 
        ${street && number ? number : ''} 
        ${complement ? `(${complement})` : ''} 
        ${number || complement ? ' - ' : ''}
        ${district ? district : ''}
        <br>
        ${city ? city : ''} 
        ${city && state ? ' / ' : ''} 
        ${state ? state : ''} 
        ${(city && country || state && country) ? ' - ' : ''} 
        ${country ? country : ''}
        `);

        newMarkers.push(marker);
        bounds.extend(marker.getLatLng());
      });

      const featureGroup = mapManager.featureGroup(newMarkers);

      setMarkers(newMarkers);
      setFGroup(featureGroup);

      featureGroup.addTo(map);
      map.fitBounds(bounds);
    }
  }, [mapManager, data]);

  const clearMarkers = () => {
    if (fGroup) {
      fGroup.clearLayers();
      setMarkers([]);
      setFGroup(null);
    }
  };
  
  const resetView = (mapInstance = map) => {
    mapInstance.setView([-23.5967045, -46.6485564], 10);
  };

  return (
    <div id="map"></div>
  );
}

export default Map;