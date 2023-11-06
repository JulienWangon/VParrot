import React from 'react';

import Header from '../../../components/common/Header/Header';
import TestimoniesSlider from '../../../components/Testimonies/public/Testimonies/TestimoniesSlider/TestimoniesSlider';

import './home.css';

const Home = () => {
  return (
    <div>

        <Header title="Garage V.Parrot" slogan="Entretien Réparation Vente de Véhicules d'occasions"/>
        <main>
            <section className="testimoniesSection">
                <TestimoniesSlider/>      
            </section>



        </main>

    </div>
  );
};

export default Home;