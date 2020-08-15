import React from "react";
import './app.scss';

import Map from './components/map';
import DeliveryForm from "./components/deliveryForm";

const App = () => {
  return (
    <div className="app-container">
      <DeliveryForm />
      <Map></Map>
    </div>
  );
} 

export default App;