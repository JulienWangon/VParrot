import React, { useState } from 'react';

import H1title from '../Title/H1Title/H1title';
import Navbar from '../Navbar/Navbar';



const Header = ({ title, slogan}) => {

  const [showModal, setShowModal] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const publicLinks = [
    { text: 'Accueil', url: '/home' },
    { text: 'Entretien', url: '/entretien' },
    { text: 'Réparation', url: '/reparation' },
    { text: 'Espace vente', url: '/vente' },
    { text: 'Contact', url: '/contact' },
    { text: 'Admin', action: toggleModal },
  ];

  const adminLinks = [

    { text: 'Utilisateurs', url: '/manageuser' },
    { text: 'Avis clients', url: '/managetestimonies' },
    { text: 'Horaires', url: '/manageschedules' },
    { text: 'Services', url: '/manageservices' },
    { text: 'Parc automobile', url: '/managecars' },
    { text: 'Deconnexion', action: logout },
  ]

  const links = currentUser ? adminLinks : publicLinks;
  const headerClass = currentUser ? "adminHeader" : "publicHeader";


  return (
    <header className={headerClass}>
        <div className="opacityLayer"></div>
        <Navbar links={links}/>
        <H1title h1Text={title} spanText={slogan}/>
      
    </header>
  );
};

export default Header;