import React, { createContext, useState, useContext } from 'react';

const ContactModalContext = createContext();

export const useContactModal = () => useContext(ContactModalContext);

export const ContactModalProvider = ({ children }) => {

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openContactModal = (data = {}) => {
   
      setModalData(data);
      setIsContactModalOpen(true);
      setIsAdModalOpen(false);
  };

  const closeContactModal = () => {
      setIsContactModalOpen(false);
  };

  const openAdModal = (data = {}) => {
    setModalData(data);
    setIsAdModalOpen(true);
};

  const closeAdModal = () => {
      setIsAdModalOpen(false);
  };

    return (

        <ContactModalContext.Provider value = {{ isContactModalOpen, openContactModal, closeContactModal, isAdModalOpen, openAdModal, closeAdModal, modalData }}>
            {children}
        </ContactModalContext.Provider>
    );
};