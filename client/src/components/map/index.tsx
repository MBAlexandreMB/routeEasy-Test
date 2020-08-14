import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { Loader } from 'google-maps';
import './map.scss';

console.log(process.env);

const Map: FunctionComponent<any> = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) {
      new Loader(process.env.G_API_KEY, {})
      .load()
      .then(result => {
        setMap(new result.maps.Map(
          document.getElementById('map'), 
          {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8,
          }
          )
        );
      })
      .catch(e => console.log(e));
    }
  }, [map]);

  return (
    <div id="map"></div>
  );
}

export default Map;