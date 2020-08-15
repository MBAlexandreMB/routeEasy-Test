import React from 'react';
import axios from 'axios';
import './deliveryForm.scss';

import { useInput } from '../../hooks/useInput';
import AddressInput from './addressInput';

const DeliveryForm = () => {
  const { value:clientName, setValue:setClientName, bind:bindClientName } = useInput('');
  const { value:weightInKg, setValue:setWeightInKg, bind:bindWeightInKg } = useInput('');
  const { value:address, setValue:setAddress, bind:bindAddress } = useInput({ address: ''});

  const onSubmit = () => {
    console.log(clientName);
    console.log(weightInKg);
    console.log(address);
  }

  const onSearchAddress = (address) => {
    axios.post(`${process.env.BASE_URL}/map/geocoder`, { address })
      .then(result => {
        if (result.data.length > 0) {
          const { formatted_address, geometry, place_id, address_components } = result.data[0];
          const ret = {
            address: formatted_address,
            placeId: place_id,
            components: address_components,
            location: {
              latitude: geometry.location.lat,
              longitude: geometry.location.lng
            }
          }
  
          setAddress(ret);
        } else {
          setAddress({
            ...address,
            error: "Nenhum endereço encontrado"
          });
        }
      })
      .catch(e => console.log(e))
  }

  return ( 
    <form className="deliveryform-container">
      <input type="text" placeholder="Nome do cliente" {...bindClientName} />
      <input type="number" placeholder="Peso da entrega" {...bindWeightInKg} />
      <AddressInput onSearch={onSearchAddress} {...bindAddress} />

      <button
      type="button"
      onClick={() => onSubmit()}
      className="btn btn-success">CADASTRAR CLIENTE</button>
    </form>
   );
}
 
export default DeliveryForm;