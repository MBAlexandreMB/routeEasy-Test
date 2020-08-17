import React, { useState } from 'react';
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
    // Remove any showing errors
    setError(null);

    // Check if all required information were correctly inputed (and show error if not)
    const checks = {
      clientName: checkClientName(),
      weightInKg: checkWeigthInKg(),
      location: {},
    }
    
    if (address.location) {
      checks.location.latitude = checkAdress(address.location.latitude);
      checks.location.longitude = checkAdress(address.location.longitude);
    } else {
      checkAdress(false, "Endereço deve ser válido. Tente clicar em BUSCAR.");
    }

    // Submit information if all checks passed
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
        clearForm();
        onSubmit();
      })
      .catch((e) => {
        // Show a back-end error, if any
        setError(e);
      });
    }
  }

  const clearForm = () => {
    resetClientName();
    resetWeightInKg();
    setAddress({ address: ''});
  };

  const onSearchAddress = (value) => {
    if (value) {
      deliveryService.getGeocode({ address: value })
        .then(result => {
          if (result.data.length > 0) {
            const { formatted_address, geometry, place_id, address_components } = result.data[0];
            // Set the object as the back-end needs it
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
    
            // Show the formatted_address from Google Geocode on the address input 
            onAddressChange(ret, ret.target.value.address);
          } else {
            // Force an error to show in the screen
            checkAdress(false, "Endereço não encontrado");
          }
        })
        .catch(e => {
          // Show a back-end error, if any
          setError(e);
        });
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