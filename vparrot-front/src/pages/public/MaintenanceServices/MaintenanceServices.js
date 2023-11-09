import React from 'react';

import useServicesGroupedByType from '../../../components/Services/hooks/useServicesGroupedByType';

import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/Footer/Footer';
import ServiceCard from '../../../components/Services/public/ServiceCard/ServiceCard';

import './maintenanceServices.css';

const MaintenanceServices = () => {

    const { servicesGroupedByType, loading, error } = useServicesGroupedByType();

  return (
    <>
      <Header title="Entretien" slogan="Entretien véhicules toutes marques"/>
      <main>
          <div className="articleMaintenanceContainer">
            <article className="maintenanceIntroduction">
                <p>
                  Bienvenue sur notre page de services d’entretien et de diagnostic chez V.Parrot. 
                  En tant que leader dans le domaine de l'entretien automobile, nous sommes dédiés à fournir des services de la plus haute qualité pour garder votre véhicule en parfait état de marche. 
                  Que vous ayez besoin d'une simple vidange d'huile, d'un service complet de réparation des freins ou d'un diagnostic détaillé de votre véhicule, notre équipe de techniciens qualifiés est prête à répondre à vos besoins.
                </p>
                <p>
                  Découvrez nos forfaits de services spécifiques ci-dessous et n'hésitez pas à nous contacter pour toute question ou pour planifier un rendez-vous. 
                  Nous sommes impatients de vous servir chez V.Parrot.
                </p>
            </article>
          </div>

          {loading && <p>Chargement des services...</p>}
          {error && <p>Erreur de chargement: {error}</p>}
          {!loading && !error && (
              <div className="servicesGrid">
                  {servicesGroupedByType.entretien.map((service) => (
                      <ServiceCard
                          key={service.id_service}
                          name={service.service_name}
                          description={service.description}
                          price={service.price}
                          pathImg={service.path_img}
                      />
                  ))}
              </div>
          )}

          <div className="articleMaintenanceContainer">
            <article className="maintenanceConclusion">
                <p>Chez V.Parrot, nous comprenons que votre véhicule est un investissement important et nous sommes déterminés à lui fournir les soins et l'attention qu'il mérite. 
                  Grâce à notre équipe d'experts et à nos services d'entretien de premier ordre, nous nous engageons à maintenir votre véhicule en parfait état de marche, améliorant ainsi sa longévité et sa fiabilité. 
                  Nous prenons le temps de comprendre vos besoins spécifiques pour vous fournir un service personnalisé qui surpasse vos attentes.
                </p>
                <p>Faites confiance à V.Parrot pour tous vos besoins en matière d'entretien automobile. 
                  Nous vous invitons à prendre rendez-vous dès aujourd'hui pour découvrir la différence V.Parrot. 
                  Que vous ayez besoin d'un entretien de routine ou d'un service plus spécifique, nous sommes impatients de vous servir et de vous aider à maintenir votre véhicule en parfait état. 
                  Rendez-vous chez V.Parrot, où la qualité rencontre l'excellence en matière de services d'entretien automobile.
                </p>
            </article>
          </div>
          

      </main>
      <Footer/>
    </>
  );
};

export default MaintenanceServices;