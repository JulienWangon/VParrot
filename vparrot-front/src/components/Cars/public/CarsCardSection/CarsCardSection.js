import React from 'react';
import { useCars } from '../../../../contexts/CarContext';


import CarsCard from '../CarsCard/CarsCard';

import './carsCardSection.css';

const CarsCardSection = ({ filteredCars, onCarDetailsClick }) => {

    const { carsBriefDetails, loadingCarsBriefDetails, errorCarsBriefDetails } = useCars();

    
    return (
      <section className="carsCardGrid">

          {loadingCarsBriefDetails && <p>Chargement en cours...</p>}
            {errorCarsBriefDetails && <p>Erreur de chargement: {errorCarsBriefDetails}</p>}
            {filteredCars === null ? (
                // Afficher toutes les voitures si filteredCars est null
                carsBriefDetails.map((car) => <CarsCard key={car.id_car} car={car} onDetailsClick={() => onCarDetailsClick(car)} />)
            ) : filteredCars.length === 0 ? (
                // Afficher le message "aucun résultat" si filteredCars est un tableau vide
                <p className="noCars">Aucun véhicule ne correspond à vos critères de recherche.</p>
            ) : (
                // Afficher les voitures filtrées
                filteredCars.map((car) => <CarsCard key={car.id_car} car={car} onDetailsClick={() => onCarDetailsClick(car)}/>)
            )}
      </section>
    );
};

export default CarsCardSection;