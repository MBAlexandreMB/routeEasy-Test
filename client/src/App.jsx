import React, { useState, useEffect } from "react";
import './app.scss';

import deliveryService from './services/deliveryService';
import Map from './components/map';
import DeliveryForm from "./components/deliveryForm";
import DeliveryTable from "./components/deliveryTable";
import DeleteDeliveries from "./components/deleteDeliveries";

const App = () => {
  const [deliveries, setDeliveries] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  const onSelectTableItem = (item) => {
    const location = { ...item.address.location }
    setSelectedMarker(location);
  }

  return (
    <div className="app-container">
      <div className="form-delete-container">
        <DeliveryForm onSubmit={updateDeliveries} />
        <DeleteDeliveries onDelete={updateDeliveries} />
      </div>
      <div>
        <Map data={deliveries} selectedMarker={selectedMarker} />
        <DeliveryTable data={deliveries} onSelectItem={onSelectTableItem} />
      </div>
    </div>
  );
} 

export default App;