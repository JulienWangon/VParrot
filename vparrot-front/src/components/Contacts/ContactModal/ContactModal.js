import React from 'react';
import { useContactModal } from '../../../contexts/ContactModalContext';
import ContactForm from '../ContactForm/ContactForm';


const ContactModal = () => {

    const { isContactModalOpen, closeContactModal, modalData } = useContactModal();

    if (!isContactModalOpen) return null;

    const handleOverlayClick = (e) => {
      closeContactModal();
    };

    const handleModalContentClick = (e) => {
      e.stopPropagation(); 
    };

    return (

      <div className="modalOverlay" onClick={handleOverlayClick}>
          <div className="modalContent" onClick={handleModalContentClick}>
              <ContactForm closeModal={closeContactModal} modalData={modalData}/>
          </div>
      </div>
    )
}

export default ContactModal;