import React from 'react';
import { useContactModal } from '../../../../contexts/ContactModalContext';
import { useCars } from '../../../../contexts/CarContext';

import Button from '../../../common/Buttons/Button/Button';
import CarImagesGallery from '../CarImagesGallery/CarImagesGallery';
import DetailsList from '../DetailsList/DetailsList';
import EquipmentsList from '../EquipmentsList/EquipmentsList';


import carModalStyle from './carModal.module.css';

import ContactBtn from '../../../common/Buttons/ContactBtn/ContactBtn';


const CarModal = ({ carId, subject }) => {
 
  const { isAdModalOpen, closeAdModal } = useContactModal();
  const { carDetails, loadingAllCarDetails, errorAllCarDetails } = useCars();

  
   // Ne rien rendre si la modale n'est pas censée être ouverte.
   if (!isAdModalOpen) {
    return null;
  };
 
  // Contenu à afficher pendant le chargement
  if (loadingAllCarDetails) {
    return <div className="modalOverlay modalOpen"><p>Chargement...</p></div>;
  };

  // Gestion des erreurs
  if (errorAllCarDetails) {
    return <div className="modalOverlay modalOpen"><p>Erreur: {errorAllCarDetails}</p></div>;
  };

  if (!carDetails) {
    return <div className="modalOverlay modalOpen"><p>Aucune information disponible pour cette voiture.</p></div>;
  };

  const getEquipmentLabel = (key) => {
    return key
  };

  
  return (
    <div className={carModalStyle.modalOverlay}>
        <div className={carModalStyle.carModal}>
            <div className={carModalStyle.modalHeader}>
                <CarImagesGallery images={carDetails.images} brand={carDetails.brand} model={carDetails.model}/> 
                <div className={carModalStyle.carNameandLoc}>
                    <div className={carModalStyle.nameCar}>
                        <div className={carModalStyle.brandModel}>
                            <span className={carModalStyle.carBrand}>{carDetails.brand}</span>
                            <span className={carModalStyle.carModel}>{carDetails.model}</span>
                        </div>
                        <div className={carModalStyle.tradeNameModal}>
                            <span className={carModalStyle.tradeName}>{carDetails.tradeName}</span>
                        </div>
                        <div className={carModalStyle.localisation}>
                            <i className={`fa-solid fa-location-dot ${carModalStyle.gpsIcon}`}></i>
                            <span className={carModalStyle.cityModal}>Toulouse, FR</span>
                        </div>
                    </div>
                    <div className={carModalStyle.modalPrice}>
                        <span className={carModalStyle.formatPrice}>{`${carDetails.price}€`}</span>
                    </div>
              </div>   
            </div>
            <div className={carModalStyle.modalBody}>
                <div className={carModalStyle.infoCarContainer}>
                <DetailsList features={carDetails} className={carModalStyle.modalCarDetails}/>
                <EquipmentsList data={carDetails.equipments} labelFunction={getEquipmentLabel}/>

                <div className={carModalStyle.contactIntro}>
                    <p className={carModalStyle.introContact}>Ce véhicule vous intéresse ? N'hésitez plus !</p>
                    <ContactBtn className="carModalContact" additionalData={{ subject: `Information sur le véhicule ${carDetails.brand} ${carDetails.model}` }}/>           
                </div>

            </div>
        
            </div>
                      
        </div>
        <Button className={carModalStyle.closeModal} colorStyle="redBtn" onClick={closeAdModal}>X</Button> 
    </div>

  );
};

export default CarModal;