import React, { useState } from 'react';
import axios from 'axios';
import deliveryService from '../../services/deliveryService';
import './deliveryForm.scss';

import { useInput } from '../../hooks/useInput';
import AddressInput from './addressInput';
import ErrorHandledInput from '../shared/ErrorHandledInput';

const DeliveryForm = ({onSubmit}) => {
  const [error, setError] = useState(null);
  const {
    value: clientName,
    setValue: setClientName,
    reset: resetClientName,
    checkValidity: checkClientName,
    bind: bindClientName
  } = useInput('', true);

  const {
    value: weightInKg,
    setValue: setWeightInKg,
    reset: resetWeightInKg,
    checkValidity: checkWeigthInKg,
    bind: bindWeightInKg,
  } = useInput('', true);

  const {
    value:address,
    setValue:setAddress,
    checkValidity: checkAdress,
    onChange: onAddressChange,
    bind:bindAddress
  } = useInput({ address: ''}, true);
  
  const handleSubmit = () => {
    setError(null);

    const checks = {
      clientName: checkClientName(),
      weightInKg: checkWeigthInKg(),
      location: {},
    }
    
    if (address.location) {
      checks.location.latitude = checkAdress(address.location.latitude);
      checks.location.longitude = checkAdress(address.location.longitude);
    } else {
      checkAdress(false);
    }

    if (
      checks.clientName &&
      checks.weightInKg &&
      checks.location.latitude &&
      checks.location.longitude
    ) {
      deliveryService.add({
        clientName,
        weightInKg,
        address,
      })
      .then(() => {
        resetClientName();
        resetWeightInKg();
        setAddress({ address: ''});
        onSubmit();
      })
      .catch((e) => {
        setError(e);
      });
    }
  }

  const onSearchAddress = (value) => {
    if (value) {
      deliveryService.getGeocode({ address: value })
        .then(result => {
          if (result.data.length > 0) {
            const { formatted_address, geometry, place_id, address_components } = result.data[0];
            const ret = {
              target: {
                value: {
                  address: formatted_address,
                  placeId: place_id,
                  components: address_components,
                  location: {
                    latitude: geometry.location.lat,
                    longitude: geometry.location.lng
                  }
                }
              }
            }
    
            onAddressChange(ret, ret.target.value.address);
          } else {
            checkAdress(false, "Endereço não encontrado");
          }
        })
        .catch(e => console.log(e))
    }
  }

  return ( 
    <form className="deliveryform-container">
      <ErrorHandledInput type="text" placeholder="Nome do cliente" {...bindClientName} />
      <ErrorHandledInput type="number" placeholder="Peso da entrega" {...bindWeightInKg} />
      <AddressInput onSearch={onSearchAddress} checkValidity={checkAdress} {...bindAddress} />
      {
        error &&
        <p className="error">{error}</p>
      }
      <button
      type="button"
      onClick={() => handleSubmit()}
      className="btn btn-success">CADASTRAR CLIENTE</button>
    </form>
   );
}
 
export default DeliveryForm;