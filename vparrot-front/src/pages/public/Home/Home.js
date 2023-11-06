import React from 'react';

//Import Components
import Header from '../../../components/common/Header/Header';
import TestimoniesSlider from '../../../components/Testimonies/public/Testimonies/TestimoniesSlider/TestimoniesSlider';
import Section from '../../../components/common/Section/Section';

//Import CSS file
import './home.css';

//Import Assets
import introPhoto1 from '../../../assets/images/homePage/introPhoto1.webp';
import introPhoto2 from '../../../assets/images/homePage/introPhoto2.webp';
import article1Photo1 from '../../../assets/images/homePage/article1Photo1.webp';
import article1Photo2 from '../../../assets/images/homePage/article1Photo2.webp';



const Home = () => {
  return (
    <div>

        <Header title="Garage V.Parrot" slogan="Entretien Réparation Vente de Véhicules d'occasions"/>
        <main>
            <section className="testimoniesSection">
                <TestimoniesSlider/>      
            </section>

            <Section
                className="introSection"
                title="L'expertise V.Parrot"
                intro="Bienvenue chez Garage V.Parrot, votre partenaire de confiance pour tous vos besoins automobiles. Forts de 15 ans d'expérience dans le domaine, nous sommes spécialisés dans les réparations, la carrosserie, l'entretien courant des véhicules et la vente de véhicules d'occasion. Notre équipe de professionnels qualifiés est dévouée à vous offrir des services de haute qualité et à satisfaire vos attentes les plus exigeantes."
                photo1={introPhoto1}
                alt1="Une femme travaillant sur un moteur"
                article1="Que vous ayez besoin d'une simple réparation, d'une rénovation complète de votre carrosserie ou d'un entretien régulier pour maintenir votre véhicule en parfait état de fonctionnement, nous sommes là pour vous. Notre expertise approfondie et notre attention méticuleuse aux détails nous permettent de garantir des résultats exceptionnels à chaque fois."
                photo2={introPhoto2}
                alt2="Photo du sigle d'une marque de voiture sur le capot"
                article2="De plus, si vous êtes à la recherche d'un véhicule d'occasion fiable, notre sélection soigneusement choisie répondra à vos besoins et à votre budget. Nous nous engageons à vous fournir des véhicules de qualité, minutieusement inspectés et prêts à prendre la route en toute confiance."            
            />

            <Section
                className="careSection"
                title="L'entretien de votre véhicule"
                intro="Chez Garage V.Parrot, nous comprenons l'importance de l'entretien régulier pour assurer la longévité et les performances optimales de votre véhicule. Notre équipe expérimentée et hautement qualifiée est spécialisée dans l'entretien courant des véhicules, offrant une gamme complète de services pour répondre à tous vos besoins."
                photo1={article1Photo1}
                alt1="Un homme tenant un bidon d'huile remplissant le réservoir d'huile d'une voiture"
                article1="Que ce soit pour une vidange d'huile, le remplacement des filtres, le contrôle et le réglage des niveaux, l'inspection des freins, le diagnostic des systèmes électroniques ou toute autre intervention nécessaire, nous sommes là pour vous. Nous utilisons des équipements de pointe et des techniques modernes pour garantir des résultats précis et fiables."
                photo2={article1Photo2}
                alt2="Homme portant un masque chirurgical au téléphone fixant l'écran de son ordinateur"
                article2="Nous comprenons que votre temps est précieux, c'est pourquoi nous nous efforçons de vous offrir un service rapide et efficace. Notre objectif est de maintenir votre véhicule en parfait état de fonctionnement, vous offrant une tranquillité d'esprit sur la route."
                bgColor="#D9D9D9"  
            />



        </main>

    </div>
  );
};

export default Home;