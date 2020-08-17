import React from 'react';
import trashImg from '../../../assets/trash.png';
import './deliveryItem.scss';

const DeliveryItem = ({data, onSelect, onDelete}) => {
  const { clientName, address, weightInKg } = data;
  const { latitude, longitude } = address.location;

  return ( 
    <tr className="deliveryitem-container">
      <td onClick={() => onSelect(data)}>{clientName}</td>
      <td onClick={() => onSelect(data)}>{address.street}</td>
      <td onClick={() => onSelect(data)}>{address.city}</td>
      <td onClick={() => onSelect(data)}>{address.country}</td>
      <td onClick={() => onSelect(data)}>{weightInKg}</td>
      <td onClick={() => onSelect(data)}>{latitude.toFixed(3)}</td>
      <td onClick={() => onSelect(data)}>{longitude.toFixed(3)}</td>
      <td className="bg-fixed" onClick={() => onDelete(data._id)}><img src={trashImg} /></td>
    </tr>
   );
}
 
export default DeliveryItem;