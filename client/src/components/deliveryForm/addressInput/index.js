import React, { useState, useEffect } from 'react';
import './addressInput.scss';

const AddressInput = ({ value, error, checkValidity, onSearch }) => {
  const [address, setAddress] = useState(value.address);

  const handleChange = (event) => {
    const { value } = event.target;

    checkValidity(value);
    setAddress(value);
  }

  useEffect(() => {
    setAddress(value.address);
  }, [value]);

  return (
    <div className="addressinput-container">
      <div className="input-search-container">
        <div className="input-slider-container">
          <input
          type="text"
          placeholder="Endereço do cliente"
          value={address}
          onChange={(e) => handleChange(e)}
          />
          <span className="slider" />
        </div>
        <button type="button" onClick={() => onSearch(address)}>BUSCAR</button>
      </div>
      {
        error &&
        <p className="error">{error}</p>
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