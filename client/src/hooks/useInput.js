import { useState } from "react";

export const useInput = (initialValue, required) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const checkValidity = (valueToCheck = value, message = 'Campo obrigatório') => {
    if (required) {
      if (valueToCheck) {
        setError('');
        return true;
      } else {
        setError(message);
        return false;
      }
    }
  };
  
  const reset = () => {
    setValue("")
  };

  const onChange = (event, valueToCheck) => {
    const { value } = event.target; 

    if (!valueToCheck) {
      valueToCheck = value;
    }

    checkValidity(valueToCheck);
    setValue(value);
  };

  return {
    value,
    setValue,
    onChange,
    checkValidity,
    reset,
    bind: {
      error,
      value,
      onChange,
    }
  };
};