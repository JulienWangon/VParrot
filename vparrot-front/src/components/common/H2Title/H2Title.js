import React from 'react';

import './h2Title.css';

const H2Title = ({className, h2Text, colorStyle}) => {
  return (
    <h2 className={`${className} ${colorStyle}`}>
        {h2Text}
    </h2>
  );
};



export default H2Title;