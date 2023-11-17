import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../../components/common/Buttons/Button/Button';
import ConnexionModal from '../../../components/admin/ConnexionModal/ConnexionModal';

import './adminLoginPage.css'

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
        <div className= "titleAndSlogan">
          <h1 className="adminPanelConnexionTitle">Garage V.Parrot</h1>
          <p className='AdminSlogan'>Connexion à votre espace administrateur</p>


        </div>
        
        <div className="adminBtnContainer">
            <Button className="connexionAdminBtn accessBtn " colorStyle="redBtn" onClick={handleOpenModal}>Connexion</Button>
            {showModal && <ConnexionModal handleCloseModal={handleCloseModal}/>}
            <Button className="accessBtn adminRedirection" colorStyle="whiteBtn" onClick={handlePublicSiteRedirect}>Accès au site</Button> 
        </div>
        
    </div>
  );
};

export default AdminLoginPage;