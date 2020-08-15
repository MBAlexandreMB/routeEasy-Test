import React from 'react';

const DeliveryItem = ({data}) => {
  return ( 
    <tr>
      <td>{data.clientName}</td>
      <td>{data.address.street}</td>
      <td>{data.address.city}</td>
      <td>{data.address.country}</td>
      <td>{data.weightInKg}</td>
      <td>{data.address.location.latitude}</td>
      <td>{data.address.location.longitude}</td>
    </tr>
   );
}
 
export default DeliveryItem;