import React, { useState } from 'react';
import useFetchallContact from '../../hooks/useFetchAllContact';
import ContactCard from '../ContactCard/ContactCard';
import TreatmentContactModal from '../TreatmentContactModal/TreatmentContactModal';
import H2Title from '../../../common/H2Title/H2Title';

const ContactSection = () => {

    const { contacts, loading, error } = useFetchallContact();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);


    const openModal = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    if (loading) return <div>Chargement...</div>
    if(error) return <div>Erreur: {error}</div>

    return (
      <section className="container mt-4">
            <H2Title h2Text = 'Contact à traiter' className="contactList"/>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {contacts.map(contact => (
                    <div key={contact.idContact} className="col d-flex align-items-stretch">
                        <ContactCard contact={contact} onOpenModal={openModal}/>
                    </div>
                ))}
            </div>
            {isModalOpen && <TreatmentContactModal contact={selectedContact} onClose={() => setIsModalOpen(false)} />}
        </section>
    );
};

export default ContactSection;