import React from 'react';

import useFetchAllCarDetailsById from '../../hooks/useFetchAllCarDetailsById';

import Button from '../../../common/Buttons/Button/Button';
import CarImagesGallery from '../CarImagesGallery/CarImagesGallery';

import './carModal.css';

const CarModal = ({ carId, isOpen, onClose}) => {


  const { car, loading, error } = useFetchAllCarDetailsById(carId);
   // Ne rien rendre si la modale n'est pas censée être ouverte.
   if (!isOpen) {
    return null;
  }

  // Contenu à afficher pendant le chargement
  if (loading) {
    return <div className="modalOverlay modalOpen"><p>Chargement...</p></div>;
  }

  // Gestion des erreurs
  if (error) {
    return <div className="modalOverlay modalOpen"><p>Erreur: {error}</p></div>;
  }

  if (!car) {
    return <div className="modalOverlay modalOpen"><p>Aucune information disponible pour cette voiture.</p></div>;
  }

  
  return (
    <div className={`modalOverlay ${isOpen ? 'modalOpen' : ''}`}>
        <div className="carModal">
            <CarImagesGallery images={car.images} brand={car.brand} model={car.model}/>

            <Button className="closeModal" colorStyle="redBtn" onClick={onClose}>Fermer</Button>

        </div>

          

        
    </div>
  );
};

export default CarModal;