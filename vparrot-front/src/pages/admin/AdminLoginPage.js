import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import H1Title from '../../components/common/H1Title/H1Title';
import Button from '../../components/common/Buttons/Button/Button';
import ConnexionModal from '../../components/admin/ConnexionModal/ConnexionModal';


const AdminLoginPage = () => {

    const navigate = useNavigate();

    //gestion de l 'état pour cacher ou afficher la modal de connexion
    const [showModal, setShowModal] = useState(false);

    //Ouverture de la modale
    const handleOpenModal = () => {
      setShowModal(true);
    };
    
    //Fermeture de la modale
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handlePublicSiteRedirect = () => {
      navigate('/accueil'); // ou le chemin que vous voulez
    };




  return (
    <div className="adminConnexion">

        <H1Title h1Text="Garage V.Parrot" spanText="Connexion à votre espace d'administration"/>
        <Button className="connexionBtn" colorStyle="redBtn" onClick={handleOpenModal}>Connexion</Button>
        {showModal && <ConnexionModal handleCloseModal={handleCloseModal}/>}
        <Button className="accessBtn" colorStyle="WhiteBtn" onClick={handlePublicSiteRedirect}>Accès au site</Button>
      
    </div>
  );
};

export default AdminLoginPage;