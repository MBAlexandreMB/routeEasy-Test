import React, { useEffect, useState } from 'react';
import DeliveryItem from './deliveryItem';

const DeliveryTable = ({data}) => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    if (data && data.length > 0) {
      setSummary({
        clients: data.length,
        weight: data.reduce((acm, delivery) => acm + delivery.weightInKg, 0),
      });
    }
  }, [data]);

  return (
    <div>
      <p>
        {
        `Total de Clientes: ${summary.clients}; 
        Peso Total: ${summary.weight}kg; 
        Ticket Médio*: ${summary.weight / summary.clients};`
        }
      </p>
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