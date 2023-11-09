import React from 'react';

import useServicesGroupedByType from '../../../components/Services/hooks/useServicesGroupedByType';

import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/Footer/Footer';
import ServiceCard from '../../../components/Services/public/ServiceCard/ServiceCard';
import H2Title from '../../../components/common/H2Title/H2Title';

import './repairServices.css';

const RepairServices = () => {

  const { servicesGroupedByType, loading, error } = useServicesGroupedByType();


  return (
    <>
      <Header title="Réparation" slogan="Réparation mécanique et carrosserie véhicules toutes marques"/>
      <main>
          <div className="articleRepairContainer">
              <article className="repairIntroduction">
                  <p>
                    Bienvenue sur notre page dédiéeau au services réparations, pour tous vos besoins en matière de réparation mécanique et de carrosserie. 
                    Avec une solide réputation basée sur la qualité, la fiabilité et l'intégrité, nous sommes dédiés à fournir des services de réparation supérieurs qui restaurent votre véhicule à son état optimal.
                  </p>
                  <p>
                    Qu'il s'agisse de remédier à une panne mécanique complexe ou de réparer des dégâts de carrosserie suite à un accident, notre équipe d'experts est équipée des outils et des compétences nécessaires pour effectuer les réparations nécessaires avec une précision et une efficacité exceptionnelles.
                     Nous comprenons l'importance d'un véhicule bien entretenu et nous nous engageons à redonner à votre voiture son apparence et sa performance d'origine.
                  </p>
              </article>
          </div>
          <section className="carrosserieSection">
              <H2Title className="carrosserieTitle" h2Text="Services de Carrosserie V.Parrot"/>
              <p className="carrosserieIntro">
                  Chez V.Parrot, nous croyons que chaque voiture mérite de briller. 
                  C'est pourquoi nous offrons des services de carrosserie de première classe, allant de la réparation de petites bosses à des travaux de restauration complets, pour redonner à votre véhicule son allure d'origine et garantir qu'il fait tourner les têtes sur la route.
              </p>
                  
              {loading && <p>Chargement des services...</p>}
              {error && <p>Erreur de chargement: {error}</p>}
              {!loading && !error && (
                  <div className="servicesGrid">
                      {servicesGroupedByType.carrosserie.map((service) => (
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

              <div className="articleCarrosserieContainer">
                  <article className="carrosserieConclusion">
                      <p>
                          Chez V.Parrot, nous sommes fiers de notre capacité à remettre votre voiture à neuf, quelle que soit l'ampleur des travaux à réaliser. 
                          Notre équipe de professionnels dédiés est à votre écoute pour répondre à tous vos besoins en matière de carrosserie. 
                          Qu'il s'agisse de réparations mineures ou d'une restauration complète, nous mettons notre savoir-faire et notre passion au service de votre véhicule.
                      </p>
                      <p>
                          Faites-nous confiance pour redonner à votre voiture son allure d'origine et garantir votre satisfaction. 
                          Venez nous rendre visite chez V.Parrot et laissez-nous prendre soin de votre voiture comme si c'était la nôtre.
                      </p>
                  </article>
              </div>
          </section>
          <section className="mecaniqueSection">
              <H2Title className="mecaniqueTitle" h2Text="V.Parrot: Votre solution mécanique"/>
              <p className="mecaniqueIntro">
                  Chez V.Parrot, nous croyons que chaque voiture mérite le meilleur en matière de maintenance et de réparation mécanique.
                  C'est pourquoi nous mettons à votre disposition une équipe de professionnels hautement qualifiés et expérimentés qui utilisent des équipements de pointe pour assurer la fiabilité et la performance de votre véhicule. 
                  Qu'il s'agisse de petites réparations ou de problèmes mécaniques complexes, nous abordons chaque tâche avec le même souci du détail et la même passion pour l'excellence. 
                  Faites confiance à V.Parrot pour tous vos besoins en réparation mécanique et laissez-nous veiller à ce que votre voiture soit toujours au sommet de ses performances.
              </p>

              {loading && <p>Chargement des services...</p>}
              {error && <p>Erreur de chargement: {error}</p>}
              {!loading && !error && (
                  <div className="servicesGrid">
                      {servicesGroupedByType.reparation.map((service) => (
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
          </section>
          <div className="articleRepairContainer">
              <article className="repairConclusion">
                  <p>
                      Chez V.Parrot, nous savons que votre véhicule est plus qu'un simple moyen de transport - c'est une partie intégrante de votre vie quotidienne. 
                      C'est pourquoi nous nous engageons à fournir des services de réparation mécanique de la plus haute qualité, afin que vous puissiez reprendre la route en toute confiance.
                  </p>
                  <p>
                      Avec V.Parrot, vous pouvez compter sur un service exceptionnel, une expertise de pointe et un souci du détail incomparable. 
                      Prenez rendez-vous avec nous dès aujourd'hui et découvrez pourquoi V.Parrot est le choix préféré pour les réparations mécaniques.
                  </p>
              </article>
          </div>
      </main>
      <Footer/>
    </>
  );
};

export default RepairServices;