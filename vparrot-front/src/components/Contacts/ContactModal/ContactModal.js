import React from 'react';
import { useContactModal } from '../../../contexts/ContactModalContext';
import ContactForm from '../ContactForm/ContactForm';


const ContactModal = () => {

    const { isModalOpen, closeModal, modalData } = useContactModal();

    if (!isModalOpen) return null;

    return (

      <div className="modalOverlay">

          <ContactForm closeModal={closeModal} modalData={modalData}/>
      </div>
    )
}

export default ContactModal;