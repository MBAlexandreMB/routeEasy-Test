import React from 'react';
import './errorHandledInput.scss';

const ErrorHandledInput = ({type, placeholder, value, onChange, error}) => {
  return (
    <div className="input-error-container">
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {
        error &&
        <p className="error">{error}</p>
      }
    </div>
   );
}
 
export default ErrorHandledInput;