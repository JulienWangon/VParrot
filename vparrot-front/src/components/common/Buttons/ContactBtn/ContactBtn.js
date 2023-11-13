import React from 'react';

import Button from '../Button/Button';

import './contactBtn.css';

const ContactBtn = ( {onClick}) => {
  return (
    <>

        <Button className="contactBtn" colorStyle="redBtn" onClick={onClick}>Contact</Button>
      
    </>
  );
};

export default ContactBtn;