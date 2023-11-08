import React from 'react';

import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/Footer/Footer';

import './maintenanceServices.css';

const MaintenanceServices = () => {
  return (
    <>
      <Header title="Entretien" slogan="Entretien véhicules toutes marques"/>
      <main>
          <div className="articleMaintenanceContainer">
            <article className="maintenanceIntroduction">
                <p>Bienvenue sur notre page de services d’entretien et de diagnostic chez V.Parrot. 
                  En tant que leader dans le domaine de l'entretien automobile, nous sommes dédiés à fournir des services de la plus haute qualité pour garder votre véhicule en parfait état de marche. 
                  Que vous ayez besoin d'une simple vidange d'huile, d'un service complet de réparation des freins ou d'un diagnostic détaillé de votre véhicule, notre équipe de techniciens qualifiés est prête à répondre à vos besoins.
                </p>
                <p>Découvrez nos forfaits de services spécifiques ci-dessous et n'hésitez pas à nous contacter pour toute question ou pour planifier un rendez-vous. 
                  Nous sommes impatients de vous servir chez V.Parrot.
                </p>
            </article>
          </div>
          

      </main>
      <Footer/>
    </>
  );
};

export default MaintenanceServices;