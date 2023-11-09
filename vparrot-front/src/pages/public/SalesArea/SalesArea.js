import React from 'react';
import Header from '../../../components/common/Header/Header';

import './salesArea.css';
import CarsCardSection from '../../../components/Cars/public/CarsCardSection/CarsCardSection';

const SalesArea = () => {
  return (
    <div>
      <Header title="Espace Vente" slogan="Véhicules d'occasions toutes marques"/>
      <CarsCardSection/>
    </div>
  );
};

export default SalesArea;