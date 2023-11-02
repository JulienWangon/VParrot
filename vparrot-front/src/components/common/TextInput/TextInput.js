import React from 'react';


const TextInput = ({inputClassName, label, placeholder, name, type, value, autoComplete, onChange, error}) => {
  return (
    <div className="formGroup">
        <label htmlFor={name}>{label}</label>
        <input
            className={inputClassName}
            type={type}
            name={name}
            value={value}
            autoComplete={autoComplete}
            onChange={onChange}
            placeholder={placeholder}        
        />
        {error && <div className="inputError">{error}</div>}    
    </div>
  );
};





export default TextInput;