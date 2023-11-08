import React from 'react';

import Button from '../Button/Button';

import './contactBtn.css';

const ContactBtn = ( {onClick}) => {
  return (
    <>

        <Button className="contactBtn" colorStyle="whiteBtn" onClick={onClick}>Contact</Button>
      
    </>
  );
};

export default ContactBtn;