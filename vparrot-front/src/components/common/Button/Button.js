import React from 'react';

import './button.css';

const Button = ({ children, className, id, onClick, type = "button", colorStyle, disabled = false }) => {
  
  return (
    <button 
        type={type} 
        className={`${className} ${colorStyle}`}
        id={id}
        onClick={onClick}
        disabled={disabled}
    >
        {children}      
    </button>
  );
};

export default Button;