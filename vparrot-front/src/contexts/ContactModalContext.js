import React, { createContext, useState, useContext } from 'react';

const ContactModalContext = createContext();

export const useContactModal = () => useContext(ContactModalContext);

export const ContactModalProvider = ({ children }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const openModal = (data = {}) => {

        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (

        <ContactModalContext.Provider value = {{ isModalOpen, openModal, closeModal, modalData }}>
            {children}
        </ContactModalContext.Provider>
    );
};