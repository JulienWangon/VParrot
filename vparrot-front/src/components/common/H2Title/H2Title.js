import React from 'react';

import './h2Title.css';

const H2Title = ({className, h2Text}) => {
  return (
    <h2 className={className}>
        {h2Text}
    </h2>
  );
};



export default H2Title;