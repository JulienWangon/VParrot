import React, { useState } from 'react';
import useFetchFilteredCars from '../../../components/Cars/hooks/useFetchFileteredCars';
import { useContactModal } from '../../../contexts/ContactModalContext';
import { useCars } from '../../../contexts/CarContext';

import Header from '../../../components/common/Header/Header';
import H2Title from '../../../components/common/H2Title/H2Title';
import CarsCardSection from '../../../components/Cars/public/CarsCardSection/CarsCardSection';
import CarFilters from '../../../components/Cars/public/CarFilters/CarFilters';
import Footer from '../../../components/Footer/Footer';
import CarModal from '../../../components/Cars/public/CarModal/CarModal';

import './salesArea.css';

const SalesArea = () => {

    const { openAdModal } = useContactModal();

    const { filteredCars, onApplyFilter, resetFilter, error } = useFetchFilteredCars();

    const [selectedCar, setSelectedCar] = useState(null);
    const [contactSubject, setContactSubject] = useState("");
    const { setCarId } = useCars();

    const handleCarDetailsClick = (car) => { 
     
        setSelectedCar(car.id_car);  // Sélectionner l'ID de la voiture pour la modale
        setContactSubject(`Demande d'information sur ${car.brand} ${car.model}`);  // Définir le sujet pour tout contact ou requête ultérieure
        setCarId(car.id_car);  // Déclencher le chargement des détails de la voiture dans le contexte
        openAdModal();  
    };

  return (
    <>
        <Header title="Espace Vente" slogan="Véhicules d'occasions toutes marques"/>
        <main>
            <section>
                <H2Title className="salesTitle" h2Text="L'occasion V.Parrot"/>
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
            </section>
            {error && <p>Erreur: {error}</p>}

            <CarFilters onApplyFilter={onApplyFilter} onResetFilter={resetFilter}/>

            <CarsCardSection filteredCars={filteredCars} onCarDetailsClick={handleCarDetailsClick}/>
            <CarModal carId={selectedCar} subject={contactSubject}/>
        </main>

        <Footer/>

      
    </>
  );
};

export default SalesArea;