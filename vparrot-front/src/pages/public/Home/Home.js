import React from 'react';

//Import Components
import Header from '../../../components/common/Header/Header';
import TestimoniesSlider from '../../../components/Testimonies/public/Testimonies/TestimoniesSlider/TestimoniesSlider';
import Section from '../../../components/common/Section/Section';
import Button from '../../../components/common/Button/Button';
import H3Title from '../../../components/common/H3Title/H3Title';

//Import CSS file
import './home.css';

//Import Assets
import introPhoto1 from '../../../assets/images/homePage/introPhoto1.webp';
import introPhoto2 from '../../../assets/images/homePage/introPhoto2.webp';
import article1Photo1 from '../../../assets/images/homePage/article1Photo1.webp';
import article1Photo2 from '../../../assets/images/homePage/article1Photo2.webp';
import article2Photo1 from '../../../assets/images/homePage/article2Photo1.webp';
import article2Photo2 from '../../../assets/images/homePage/article2Photo2.webp';
import conclusionPhoto1 from '../../../assets/images/homePage/conclusionPhoto1.webp';
import conclusionPhoto2 from '../../../assets/images/homePage/conclusionPhoto2.webp';





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

            <section className="iconSection">
                <div className="IconOpacityLayer"></div>

                <div className="iconsContainer">
                    <div className="iconGroup">
                        <svg 
                            className="icon" 
                            id="Icon"
                            fill="#BB271A"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >    
                            <path d = "m16 9.25c-3.17 0-5.75 2.58-5.75 5.75s2.58 5.75 5.75 5.75 5.75-2.58 5.75-5.75-2.58-5.75-5.75-5.75zm2.416 5.374-3 2c-.127.084-.272.126-.416.126-.194 0-.386-.075-.531-.22l-1-1c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l.565.565 2.488-1.659c.344-.231.81-.137 1.04.208s.137.81-.208 1.04zm-8.666-11.374v2.75c0 .14.11.25.25.25h3c.14 0 .25-.11.25-.25v-2.75zm7.25 0h-2.25v2.75c0 .96-.79 1.75-1.75 1.75h-3c-.96 0-1.75-.79-1.75-1.75v-2.75h-2.25c-1.52 0-2.75 1.23-2.75 2.75v12c0 1.52 1.23 2.75 2.75 2.75h5.6c-1.73-1.32-2.85-3.41-2.85-5.75 0-4 3.25-7.25 7.25-7.25 1.38 0 2.66.38 3.75 1.06v-2.81c0-1.52-1.23-2.75-2.75-2.75z"/>      
                        </svg>
                        <H3Title className="iconTitle" h3Text="Disponibilité"/>
                        <p className="iconContent">Dès la réception de votre demande, un technicien prendra rapidement contact avec vous pour vérifier vos disponibilité.</p>
                    </div>

                    <div className="iconGroup">
                        <svg
                            className="icon"
                            id="Layer_1"
                            fill="#BB271A"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"      
                        >
                            <path d="m177.596 283.637c-11.243 7.106-21.326 10.644-37.212 13.127l74.853 74.853c2.483-15.886 6.021-25.97 13.127-37.212-3.709-1.482-7.182-3.719-10.177-6.713l-33.877-33.877c-2.994-2.995-5.231-6.467-6.713-10.177zm157.518 115.398c1.354-6.882-.637-13.423-5.596-18.382l-62.028-62.028c4.14-9.271 3.425-20.217-2.146-28.909l8.651-8.651 71.831 71.831c1.952 1.952 5.118 1.952 7.07 0s1.952-5.118 0-7.07l-71.831-71.831 22.033-22.033 77.555 77.555c4.96 4.96 11.5 6.951 18.382 5.597 25.663-5.051 53.293 2.362 73.178 22.247 19.846 19.846 27.273 47.407 22.282 73.028-1.535 7.881-11.211 10.836-16.888 5.158l-31.339-31.349c-2.596-2.597-6.113-3.54-9.66-2.589l-22.027 5.902c-3.547.951-6.12 3.524-7.071 7.071l-5.902 22.027c-.95 3.547-.008 7.064 2.59 9.66l31.349 31.339c5.678 5.677 2.724 15.353-5.158 16.888-25.621 4.991-53.182-2.437-73.028-22.283-19.885-19.885-27.298-47.515-22.247-73.178zm-141.74-154.525-62.027-62.027c-4.959-4.96-11.5-6.951-18.382-5.596-25.663 5.051-53.293-2.362-73.178-22.247-19.846-19.846-27.274-47.408-22.282-73.028 1.535-7.881 11.212-10.836 16.888-5.158l31.339 31.349c2.596 2.597 6.113 3.54 9.66 2.589l22.027-5.902c3.547-.95 6.12-3.524 7.071-7.071l5.902-22.027c.95-3.547.008-7.064-2.59-9.66l-31.349-31.339c-5.679-5.677-2.724-15.353 5.158-16.888 25.621-4.99 53.182 2.436 73.028 22.282 19.885 19.885 27.298 47.515 22.247 73.178-1.354 6.882.636 13.422 5.596 18.382l77.555 77.555-22.033 22.033-71.831-71.831c-1.952-1.952-5.118-1.952-7.07 0s-1.952 5.118 0 7.07l71.831 71.83-8.651 8.651c-8.692-5.571-19.638-6.286-28.909-2.146zm60.802 76.11c-7.953 7.953-20.966 7.953-28.919 0l-33.877-33.877c-7.953-7.953-7.953-20.966 0-28.919s20.966-7.952 28.919 0l33.877 33.877c7.952 7.953 7.953 20.966 0 28.919zm146.606-180.483c1.427-1.427 3.014-2.289 4.988-2.709l28.828-6.14c2.542-.541 4.547-1.856 6.057-3.972l40.383-56.587c2.862-4.01 2.415-9.396-1.069-12.88l-25.819-25.819c-3.484-3.484-8.869-3.931-12.88-1.069l-56.587 40.383c-2.115 1.51-3.43 3.515-3.972 6.057l-6.14 28.829c-.42 1.974-1.282 3.561-2.709 4.988l-142.013 142.014 28.919 28.919zm-270.124 161.042-88.081 88.081c-22.045 22.045-22.045 58.117 0 80.162s58.118 22.045 80.162 0l88.081-88.081-80.162-80.163zm-55.567 116.079c-1.952 1.952-5.118 1.952-7.07 0s-1.952-5.118 0-7.07l64.873-64.873c1.952-1.952 5.118-1.952 7.07 0s1.952 5.118 0 7.07zm26.721 26.721c-1.952 1.952-5.118 1.952-7.07 0s-1.952-5.118 0-7.07l64.873-64.873c1.952-1.952 5.118-1.952 7.07 0s1.952 5.118 0 7.07z"/>
                        </svg>
                        <H3Title className="iconTitle" h3Text="Profesionnalisme"/>
                        <p className="iconContent">Equipé des dernières technologies de pointes en matière de contrôles et sécurité, notre équipe est à votre service pour assurer la longevité de votre véhicule</p>
                    </div>
                    <div className="iconGroup">
                        <svg
                            className="icon"
                            id="Layer_1"
                            fill="#BB271A"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"                    
                        >
                            <path d="m69.462 331.342a13.6 13.6 0 0 1 0-19.211l43.845-43.846a13.664 13.664 0 0 1 19.211 0 13.617 13.617 0 0 1 0 19.211l-43.846 43.846a13.6 13.6 0 0 1 -19.21 0zm40.951 35.3a13.477 13.477 0 0 0 9.6-3.947l54.087-54.095a13.584 13.584 0 0 0 -19.211-19.211l-10.23 10.236-.01.01h-.016l-43.833 43.844a13.553 13.553 0 0 0 9.613 23.158zm32.387 17.08a13.6 13.6 0 0 0 19.211 0l32.917-32.917a13.6 13.6 0 0 0 0-19.211 13.745 13.745 0 0 0 -16.732-1.963 8.628 8.628 0 0 1 -1.644.785l-34.4 34.409a7.989 7.989 0 0 1 -.814 1.417 13.716 13.716 0 0 0 1.467 17.48zm77.4 4.165-21.71 21.72a13.583 13.583 0 0 1 -20.81-17.283l25.3-25.313a.473.473 0 0 0 .142-.076 13.585 13.585 0 0 1 17.078 20.952zm203.011-289.459 88.789 94.516-35.568 33.408-88.789-94.516zm-38.133 35.816s-.011 0-.011.01zm-104.585 28.738-60.471 38.735a10.444 10.444 0 0 0 -5.227 8.308 9.99 9.99 0 0 0 3.785 9.173c3.607 2.783 8.915 3.441 13.848 1.715l56.8-19.868a27.208 27.208 0 0 1 28.8 6.577l76.955 76.955 59.1-56.95-66.383-70.676-32.65 22.236a27.426 27.426 0 0 1 -28.157 1.832l-36.266-18.341a9.839 9.839 0 0 0 -10.134.3zm-127.96 7.458-33.903-13.64-57.709 82.42 30.529 26.657 9.719-9.725a30.734 30.734 0 0 1 51.6 14.43 30.757 30.757 0 0 1 39.879 40.765 30.7 30.7 0 0 1 22.652 36.615 30.571 30.571 0 0 1 25.916 27.738l29.249 29.264a13.049 13.049 0 0 0 22.287-9.249 12.945 12.945 0 0 0 -3.81-9.233l-43.8-43.8a8.581 8.581 0 1 1 12.143-12.128l43.785 43.78a.01.01 0 0 0 .01.01v.015l9.269 9.254a13.067 13.067 0 0 0 18.477-18.482h-.01l-51.733-51.731a8.58 8.58 0 1 1 12.127-12.142l51.744 51.742.01.01.01.01 10 10a13.064 13.064 0 1 0 18.468-18.482l-60.426-60.441a8.578 8.578 0 1 1 12.128-12.133l60.43 60.431h.011v.01a13.067 13.067 0 0 0 18.482-18.477l-94.167-94.174a10.274 10.274 0 0 0 -11-2.509l-56.8 19.864c-10.351 3.622-21.852 1.963-30-4.331a27.141 27.141 0 0 1 -10.4-24.139 27.666 27.666 0 0 1 13.074-21.376l32.219-20.638-23.5-12.345a10.034 10.034 0 0 0 -9.244-.3l-36.061 16.06a27.2 27.2 0 0 1 -21.655.4zm-78.159-65.435 39.975 27.984-74.374 106.239-39.975-27.984z"/>
                        </svg>
                        <H3Title className="iconTitle" h3Text="Transparence"/>
                        <p className="iconContent">A la restitution du véhicule, le technicien en charge de l’intervention vous remet un rapport détaillé et expliqué point par point.</p>
                    </div>
                </div>
                <div className="iconConclusion">
                    <p className="conclusionText">Chez Garage V.Parrot, votre satisfaction est notre priorité absolue. Faites confiance à notre expertise et à notre engagement envers un service de qualité supérieure. Prenez rendez-vous dès aujourd'hui pour l'entretien de votre véhicule et découvrez pourquoi tant de clients font confiance à notre équipe pour prendre soin de leur voiture.</p>
                </div>
                <div className="iconeBtnContainer">
                    <Button className="iconBtn" colorStyle="redBtn">Contact</Button>
                </div>
            </section>

            <Section
                className="repairSection"
                title="Besoind'une réparation ?"
                intro="Chez Garage V.Parrot, nous sommes spécialisés dans la réparation et la carrosserie des véhicules, offrant des services de qualité pour redonner vie à votre voiture après un accident ou une usure normale. Avec notre équipe compétente et expérimentée, nous sommes prêts à relever tous les défis, des réparations mineures aux rénovations majeures."
                photo1={article2Photo1}
                alt1="Homme portant des gants noire cirant la carrosserie d'une voiture violette"
                article1="Que votre véhicule nécessite des travaux de redressement de la carrosserie, des réparations des éléments de la carrosserie, la réparation des pare-chocs, des ailes ou des portières, nous sommes équipés pour fournir des résultats exceptionnels. Nous utilisons des techniques de pointe, des outils spécialisés et des matériaux de haute qualité pour assurer une finition impeccable."
                photo2={article2Photo2}
                alt2="Homme en combinaison grise travaillant sur le moteur d'une voiture"
                article2="Nos mécaniciens et techniciens sont formés pour diagnostiquer rapidement les problèmes mécaniques et électroniques, afin d'effectuer les réparations nécessaires avec précision. Que ce soit pour la transmission, le système de freinage, la suspension ou tout autre composant, nous sommes compétents pour résoudre les problèmes et vous remettre en route en toute sécurité."        
            />

           <Section
                className="conclusionSection"
                title="La satisfaction V.Parrot"
                photo1={conclusionPhoto1}
                alt1="Garagiste en salopette grise et tee-shirt noir accroupie et accoudé sur un pneu"
                article1="Chez Garage V.Parrot, nous sommes fiers de notre engagement envers la satisfaction du client. Nous vous tiendrons informé de l'avancement des travaux et nous vous fournirons des devis détaillés avant d'entreprendre toute réparation ou rénovation. Notre approche transparente et notre attention méticuleuse aux détails nous permettent de vous offrir un service de réparation et de carrosserie de premier ordre."
                photo2={conclusionPhoto2}
                alt2="poignée de main entre deux hommes"
                article2="Confiez-nous votre véhicule et faites l'expérience d'un service professionnel et fiable. Prenez rendez-vous dès aujourd'hui et laissez notre équipe qualifiée prendre soin de votre voiture, lui redonnant son apparence et ses performances optimales."       
                bgColor="#D9D9D9"
            />



        </main>

    </div>
  );
};

export default Home;