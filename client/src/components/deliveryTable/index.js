import React, { useEffect, useState } from 'react';
import './deliveryTable.scss';

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
      { 
        (data && data.length > 0) ?
        <>
          <div className="summary-container">
            <p>{`Total de Clientes: ${summary.clients};`}</p>
            <p>{`Peso Total: ${summary.weight}kg;`}</p>
            <p>{`Ticket Médio*: ${summary.weight / summary.clients};`}</p>
          </div>
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
                data.map((delivery) => {
                  return <DeliveryItem key={delivery.clientName+delivery.weightInKg} data={delivery} />
                })
              }
            </tbody>
          </table>
        </>
        :
        <p>Nenhuma entrega cadastrada!</p>
      }
    </div>
  );
}
 
export default DeliveryTable;