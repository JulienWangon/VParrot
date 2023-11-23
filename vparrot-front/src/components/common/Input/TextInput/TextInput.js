import React from 'react';

const TextInput = ( {inputClassName, label, placeholder, name, type, value, autoComplete, onChange, error, formGroupClass}) => {

    return (
        <div className={formGroupClass || 'formGroup'}>
            <label htmlFor={name}>{label}</label>
            <input
                className={inputClassName}
                type={type}
                id={name}
                name={name}
                value={value}
                autoComplete={autoComplete}
                placeholder={placeholder}
                onChange={onChange}                  
            />
            {error && <div className="inputError">{error}</div>}          
        </div>
    );
};

export default TextInput;