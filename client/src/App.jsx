import React, { useState, useEffect } from "react";
import './app.scss';

import deliveryService from './services/deliveryService';
import Map from './components/map';
import DeliveryForm from "./components/deliveryForm";
import DeliveryTable from "./components/deliveryTable";

const App = () => {
  const [deliveries, setDeliveries] = useState(null);

  useEffect(() => {
    if (!deliveries) {
      updateDeliveries();
    }
  });

  const updateDeliveries = () => {
    deliveryService.getAll()
    .then(result => {
      setDeliveries(result.data);
    })
    .catch(e => console.log(e));
  };

  return (
    <div className="app-container">
      <DeliveryForm onSubmit={updateDeliveries} />
      <div>
        <Map data={deliveries} />
        <DeliveryTable data={deliveries} />
      </div>
    </div>
  );
} 

export default App;