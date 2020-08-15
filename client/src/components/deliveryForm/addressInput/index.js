import React, { useState } from 'react';
import './addressInput.scss';

const AddressInput = ({ value, onChange: locationChange, onSearch }) => {
  const [address, setAddress] = useState(value.address);

  const handleChange = (event) => {
    setAddress(event.target.value);
  }

  return (
    <div className="addressinput-container">
      <div className="input-search-container">
        <input
        type="text"
        placeholder="Endereço do cliente"
        value={address}
        onChange={(e) => handleChange(e)}
        />
        <button type="button" onClick={() => onSearch(address)}>BUSCAR</button>
      </div>
      {
        value.error &&
        <p>{value.error}</p>
      }

      <div className="location-container">
        <input
        type="number"
        className="l1"
        placeholder="Latitude"
        value={value.location ? value.location.latitude : ''}
        disabled
        />
        <input
        type="number"
        className="l2"
        placeholder="Longitude"
        value={value.location ? value.location.longitude : ''}
        disabled />
      </div>
    </div>
  );
}
  
export default AddressInput;