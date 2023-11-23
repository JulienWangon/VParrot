import React from 'react';
import useFetchCarsBriefDetails from '../../hooks/useFetchCarsBriefDetails';

import CarsCard from '../CarsCard/CarsCard';

import './carsCardSection.css';

const CarsCardSection = ({ filteredCars, onCarDetailsClick }) => {

    const { carsBriefDetails, loading, error} = useFetchCarsBriefDetails();

    
    return (
      <section className="carsCardGrid">

          {loading && <p>Chargement des services...</p>}
          {error && <p>Erreur de chargement: {error}</p>}
          
          {loading && <p>Chargement en cours...</p>}
            {error && <p>Erreur de chargement: {error}</p>}
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