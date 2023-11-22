import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../../components/common/Buttons/Button/Button';
import ConnexionModal from '../../../components/admin/ConnexionModal/ConnexionModal';

import adminStyle from './adminLoginPage.module.css'

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
    <div className={adminStyle.adminConnexion}>
        <div className= {adminStyle.titleAndSlogan}>
          <h1 className={adminStyle.adminPanelConnexionTitle}>Garage V.Parrot</h1>
          <p className={adminStyle.AdminSlogan}>Connexion à votre espace administrateur</p>


        </div>
        
        <div className={adminStyle.adminBtnContainer}>
            <Button className={adminStyle.connexionAdminBtn } colorStyle="redBtn" onClick={handleOpenModal}>Connexion</Button>
            {showModal && <ConnexionModal handleCloseModal={handleCloseModal}/>}
            <Button className={adminStyle.adminRedirection} colorStyle="whiteBtn" onClick={handlePublicSiteRedirect}>Accès au site</Button> 
        </div>
        
    </div>
  );
};

export default AdminLoginPage;