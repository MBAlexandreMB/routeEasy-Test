import React from 'react';
import './deliveryItem.scss';

const DeliveryItem = ({data, onSelect}) => {
  const { clientName, address, weightInKg } = data;
  const { latitude, longitude } = address.location;

  return ( 
    <tr className="deliveryitem-container" onClick={() => onSelect(data)}>
      <td>{clientName}</td>
      <td>{address.street}</td>
      <td>{address.city}</td>
      <td>{address.country}</td>
      <td>{weightInKg}</td>
      <td>{latitude.toFixed(3)}</td>
      <td>{longitude.toFixed(3)}</td>
    </tr>
   );
}
 
export default DeliveryItem;