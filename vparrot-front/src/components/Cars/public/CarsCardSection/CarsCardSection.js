import React from 'react';
import useFetchCarsBriefDetails from '../../hooks/useFetchCarsBriefDetails';

import CarsCard from '../CarsCard/CarsCard';

const CarsCardSection = () => {

    const { carsBriefDetails, loading, error} = useFetchCarsBriefDetails();

    return (
      <section className="CarsCardGrid">

          {loading && <p>Chargement des services...</p>}
          {error && <p>Erreur de chargement: {error}</p>}
          
          {carsBriefDetails.map((car) => 
              <CarsCard key={car.id_car} car={car}/>          
          )}        
      </section>
    );
};

export default CarsCardSection;