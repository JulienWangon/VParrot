import React from 'react';

import useFetchAllCarDetailsById from '../../hooks/useFetchAllCarDetailsById';

import Button from '../../../common/Buttons/Button/Button';
import CarImagesGallery from '../CarImagesGallery/CarImagesGallery';
import DetailsList from '../DetailsList/DetailsList';
import EquipmentsList from '../EquipmentsList/EquipmentsList';


import './carModal.css';
import ContactForm from '../../../Contacts/ContactForm/ContactForm';


const CarModal = ({ carId, isOpen, onClose}) => {

  const { car, loading, error } = useFetchAllCarDetailsById(carId);
   // Ne rien rendre si la modale n'est pas censée être ouverte.
   if (!isOpen) {
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
    <div className={`modalOverlay ${isOpen ? 'modalOpen' : ''}`}>
        <div className="carModal">
            <div className="modalHeader">
                <CarImagesGallery images={car.images} brand={car.brand} model={car.model}/> 
                <div className="carNameandLoc">
                    <div className="nameCar">
                        <div className="brandModel">
                            <span className="carBrand">{car.brand}</span>
                            <span className="carModel">{car.model}</span>
                        </div>
                        <div className="tradeNameModal">
                            <span className="tradeName">{car.tradeName}</span>
                        </div>
                        <div className="localisation">
                            <i className="fa-solid fa-location-dot gpsIcon"></i>
                            <span className="cityModal">Toulouse, FR</span>
                        </div>
                    </div>
                    <div className="modalPrice">
                        <span className="formatPrice">{`${car.price}€`}</span>
                    </div>
              </div>   
            </div>
            <div className="modalBody">
                <div className="infoCarContainer">
                <DetailsList features={car} className="modalCarDetails"/>
                <EquipmentsList data={car.equipments} labelFunction={getEquipmentLabel}/>

                <div className="contactIntro">
                    <p className="introContact">Ce véhicule vous intéresse ? N'hésitez plus !</p>
                    <p className="contactUs">Contactez Nous !</p>
                </div>

                <div className="accordion">
                    <div className="accordionItem">
                        <h2 className="accordionHeaderForm">
                        <button className="accordion-button formAnim" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Contact
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                            <div className="accordionBody">
                                <ContactForm subject={`Annonce #${car.idCar} : ${car.brand} ${car.model}`}/>
                            </div>
                        </div>
                  </div>
                </div>
            </div>
        
            </div>
                      
        </div>
        <Button className="closeModal" colorStyle="redBtn" onClick={onClose}>X</Button> 
    </div>

  );
};

export default CarModal;