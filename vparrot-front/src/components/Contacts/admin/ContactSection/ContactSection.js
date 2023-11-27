import React from 'react';
import useFetchallContact from '../../hooks/useFetchAllContact';
import ContactCard from '../ContactCard/ContactCard';

const ContactSection = () => {

    const { contacts, loading, error } = useFetchallContact();

    if (loading) return <div>Chargement...</div>
    if(error) return <div>Erreur: {error}</div>

    return (
      <section className="container mt-4">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {contacts.map(contact => (
                    <div key={contact.idContact} className="col d-flex align-items-stretch">
                        <ContactCard contact={contact} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContactSection;