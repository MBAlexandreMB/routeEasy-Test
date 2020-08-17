import React, { useEffect, useState } from 'react';
import './deliveryTable.scss';

import DeliveryItem from './deliveryItem';

const DeliveryTable = ({data, onSelectItem, onDeleteItem}) => {
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
        <div className="summary-table-container">
          <div className="summary-container">
            <p className="summary">
              {
                `Total de Clientes: ${summary.clients} | 
                Peso Total: ${summary.weight}kg |
                Ticket Médio*: ${summary.weight / summary.clients}`
              } 
            </p>
          </div>
          <div className="table-container">
            <table cellSpacing="0">
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
                    const { clientName, weightInKg, address } = delivery;
                    const { latitude, longitude } = address.location;
                    const key = `${clientName}+${weightInKg}+${latitude}+${longitude}`;

                    return (
                    <DeliveryItem
                    key={key}
                    data={delivery}
                    onSelect={onSelectItem}
                    onDelete={onDeleteItem}
                    />
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <p className="footnote">*Peso total/Total de clientes</p>
        </div>
        :
        <p>Nenhuma entrega cadastrada!</p>
      }
    </div>
  );
}
 
export default DeliveryTable;