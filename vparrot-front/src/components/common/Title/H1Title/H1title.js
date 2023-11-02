import React from 'react';
import PropTypes from 'prop-types';

const H1title = ( {h1Text, spanText}) => {
  return (
    <div className="h1container">

        <h1>{h1Text}</h1>
        <span>{spanText}</span>
      
    </div>
  );
};

H1title.propTypes = {
    h1Text: PropTypes.string.isRequired,
    spanText: PropTypes.string.isRequired
}

export default H1title;