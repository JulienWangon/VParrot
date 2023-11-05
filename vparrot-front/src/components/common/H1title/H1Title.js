import React from 'react';
import PropTypes from 'prop-types';

import './h1Title.css';


const H1Title = ({h1Text, spanText}) => {
  return (
    <div className="titleContainer">
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