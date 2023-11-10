import React from 'react';
import Header from '../../../components/common/Header/Header';

import './salesArea.css';
import CarsCardSection from '../../../components/Cars/public/CarsCardSection/CarsCardSection';

const SalesArea = () => {
  return (
    <>
      <Header title="Espace Vente" slogan="Véhicules d'occasions toutes marques"/>

      <article className="salesIntroduction">
          <p> 
              Bienvenue sur notre page de vente de véhicules d'occasion chez Garage V.Parrot ! 
              Nous sommes fiers de vous proposer une sélection exceptionnelle de voitures d'occasion de haute qualité pour répondre à tous vos besoins et préférences. 
              Que vous recherchiez une berline élégante, un SUV polyvalent, une compacte économique ou tout autre type de véhicule, nous avons ce qu'il vous faut. 
              Avec 15 ans d'expérience dans le domaine, nous mettons tout en œuvre pour vous offrir des véhicules fiables, minutieusement inspectés et prêts à prendre la route en toute confiance.
          </p>
          <p>
              Notre équipe experte est là pour vous guider tout au long du processus d'achat, en vous offrant des conseils avisés et un service personnalisé. 
              Parcourez notre inventaire en ligne et découvrez nos offres exceptionnelles. 
              Chez Garage V.Parrot, nous sommes impatients de vous aider à trouver le véhicule d'occasion de vos rêves !
          </p>
      </article>

      <CarsCardSection/>

      
    </>
  );
};

export default SalesArea;