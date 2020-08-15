import React, { useEffect } from 'react';
import DeliveryItem from './deliveryItem';

const DeliveryTable = ({data}) => {
  return (
    <div>
      <p>Total de Clientes: ; Peso Total: kg; Ticket Médio*: R$ ;</p>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rua</th>
            <th>Cidade</th>
            <th>País</th>
            <th>Peso</th>
            <th>Lat</th>
            <th>Lng</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.length > 0 &&
            data.map((delivery) => {
              return <DeliveryItem key={delivery.clientName+delivery.weightInKg} data={delivery} />
            })
          }
        </tbody>
      </table>
    </div>
  );
}
 
export default DeliveryTable;