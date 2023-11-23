import React from 'react';
import { useContactModal } from '../../../../contexts/ContactModalContext';
import useFetchAllCarDetailsById from '../../hooks/useFetchAllCarDetailsById';
import Button from '../../../common/Buttons/Button/Button';
import CarImagesGallery from '../CarImagesGallery/CarImagesGallery';
import DetailsList from '../DetailsList/DetailsList';
import EquipmentsList from '../EquipmentsList/EquipmentsList';


import carModalStyle from './carModal.module.css';

import ContactBtn from '../../../common/Buttons/ContactBtn/ContactBtn';


const CarModal = ({ carId, subject }) => {
  console.log("Sujet reçu dans CarModal:", subject)
  
  const { isAdModalOpen, closeAdModal } = useContactModal();


  const { car, loading, error } = useFetchAllCarDetailsById(carId);
   // Ne rien rendre si la modale n'est pas censée être ouverte.
   if (!isAdModalOpen) {
    return null;
  };

  // Contenu à afficher pendant le chargement
  if (loading) {
    return <div className="modalOverlay modalOpen"><p>Chargement...</p></div>;
  };

  // Gestion des erreurs
  if (error) {
    return <div className="modalOverlay modalOpen"><p>Erreur: {error}</p></div>;
  };

  if (!car) {
    return <div className="modalOverlay modalOpen"><p>Aucune information disponible pour cette voiture.</p></div>;
  };

  const getEquipmentLabel = (key) => {
    return key
  };

  
  return (
    <div className={carModalStyle.modalOverlay}>
        <div className={carModalStyle.carModal}>
            <div className={carModalStyle.modalHeader}>
                <CarImagesGallery images={car.images} brand={car.brand} model={car.model}/> 
                <div className={carModalStyle.carNameandLoc}>
                    <div className={carModalStyle.nameCar}>
                        <div className={carModalStyle.brandModel}>
                            <span className={carModalStyle.carBrand}>{car.brand}</span>
                            <span className={carModalStyle.carModel}>{car.model}</span>
                        </div>
                        <div className={carModalStyle.tradeNameModal}>
                            <span className={carModalStyle.tradeName}>{car.tradeName}</span>
                        </div>
                        <div className={carModalStyle.localisation}>
                            <i className={`fa-solid fa-location-dot ${carModalStyle.gpsIcon}`}></i>
                            <span className={carModalStyle.cityModal}>Toulouse, FR</span>
                        </div>
                    </div>
                    <div className={carModalStyle.modalPrice}>
                        <span className={carModalStyle.formatPrice}>{`${car.price}€`}</span>
                    </div>
              </div>   
            </div>
            <div className={carModalStyle.modalBody}>
                <div className={carModalStyle.infoCarContainer}>
                <DetailsList features={car} className={carModalStyle.modalCarDetails}/>
                <EquipmentsList data={car.equipments} labelFunction={getEquipmentLabel}/>

                <div className={carModalStyle.contactIntro}>
                    <p className={carModalStyle.introContact}>Ce véhicule vous intéresse ? N'hésitez plus !</p>
                    <ContactBtn className="carModalContact" additionalData={{ subject: `Information sur le véhicule ${car.brand} ${car.model}` }}/>           
                </div>

            </div>
        
            </div>
                      
        </div>
        <Button className={carModalStyle.closeModal} colorStyle="redBtn" onClick={closeAdModal}>X</Button> 
    </div>

  );
};

export default CarModal;