import React from 'react';
import PropTypes from 'prop-types';


const H1Title = ({h1Text, spanText}) => {
  return (
    <div className="titleContainer">
        <h1>{h1Text}</h1>
        <span>{spanText}</span>
    </div>
  );
};


H1Title.propTypes = {
  h1Text: PropTypes.string.isRequired,
  spanText: PropTypes.string.isRequired
}

export default H1Title;