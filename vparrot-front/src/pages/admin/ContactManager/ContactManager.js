import React from 'react';
import Header from '../../../components/common/Header/Header';
import ContactSection from '../../../components/Contacts/admin/ContactSection/ContactSection';


const ContactManager = () => {
  return (
    <>
      <Header title="Contacts" slogan="Gestion des contacts"/>
      <main>
          <ContactSection/>


      </main>
      
    </>
  );
};

export default ContactManager;