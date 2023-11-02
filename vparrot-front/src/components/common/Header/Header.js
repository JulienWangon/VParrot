import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';


import H1Title from '../H1Title/H1Title';
import Navbar from '../Navbar/Navbar';




const Header = ({ title, slogan}) => {

  const [showModal, setShowModal] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const publicLinks = [
    { text: 'Accueil', url: '/home' },
    { text: 'Entretiens', url: '/entretiens' },
    { text: 'Réparations', url: '/reparations' },
    { text: 'Espace ventes', url: '/ventes' },
    { text: 'Contact', url: '/contact' },
    { text: 'Admin', action: toggleModal },
  ];

  const adminLinks = [

    { text: 'Utilisateurs', url: '/manageusers' },
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
        <H1Title h1Text={title} spanText={slogan}/>
      
    </header>
  );
};

export default Header;