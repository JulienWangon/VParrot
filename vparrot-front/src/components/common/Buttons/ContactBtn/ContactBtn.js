import React from 'react';

import Button from '../Button/Button';

import './contactBtn.css';
import { useContactModal } from '../../../../contexts/ContactModalContext';

const ContactBtn = ( { additionalData }) => {

    const { openContactModal } = useContactModal();
  
    const handleClick = () => {
      console.log("Données supplémentaires passées à ContactBtn:", additionalData);
        openContactModal(additionalData || {});
    }

  return (
    <>

        <Button className="contactBtn" colorStyle="redBtn" onClick={handleClick}>Contact</Button>
      
    </>
  );
};

export default ContactBtn;