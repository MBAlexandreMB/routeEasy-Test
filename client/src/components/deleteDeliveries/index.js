import React from 'react';
import './deleteDeliveries.scss';

import deliveryService from '../../services/deliveryService';

const DeleteDeliveries = ({onDelete}) => {
  const deleteDeliveries = () => {
    deliveryService.remove()
    .then(() => {
      onDelete();
    })
    .catch((e) => console.log(e));
  }

  return ( 
    <div className="deletedeliveries-container">
      <button
      type="button"
      onClick={() => deleteDeliveries()}
      className="btn btn-danger"
      >
        RESETAR CADASTRO
      </button>
    </div>
   );
}
 
export default DeleteDeliveries;