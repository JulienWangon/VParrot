import React from 'react';

const SelectInput = ({ inputClassName, label, name, value, onChange, options, disabled, error }) => {
    return (
          <div className="formGroup">
              <label htmlFor={name}>{label}</label>
              <select className={inputClassName} id={name} name={name} value={value} onChange={onChange} disabled={disabled}>
                  {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                  ))}
              </select>
              {error && <div className="inputError">{error}</div>}     
        </div>
    );
};

export default SelectInput;