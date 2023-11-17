import React from 'react';
import PropTypes from 'prop-types';

import './h1Title.css';


const H1Title = ({h1Text, spanText, className}) => {
  return (
    <div className={`titleContainer ${className}`}>
        <h1>{h1Text}</h1>
        <span className="slogan">{spanText}</span>
    </div>
  );
};


H1Title.propTypes = {
  h1Text: PropTypes.string.isRequired,
  spanText: PropTypes.string.isRequired
}

export default H1Title;