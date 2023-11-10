import React from 'react';

const TextArea = ({ inputClassName, label, placeholder, name, value, readOnly, onChange, error}) => {
    return (
      <div className = "formGroup">
          <label htmlFor={name}>{name}</label>
          <textarea
              className={inputClassName}
              id={name}
              name={name}
              value={value}
              readOnly={readOnly}
              onChange={onChange}
              placeholder={placeholder}
          >            
          </textarea>
          {error && <div className="inputError">{error}</div>}
        
      </div>
    );
};

export default TextArea;