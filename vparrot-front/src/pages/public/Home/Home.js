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
                <div className="opacityLayer"></div>

                <div className="iconsContainer">
                    <div className="iconGroup">
                        <svg 
                            className= "icon" 
                            id = "Icon"
                            fill = "#BB271A"
                            viewBox = "0 0 24 24"
                            xmlns = "http://www.w3.org/2000/svg"
                        >    
                            <path d = "m16 9.25c-3.17 0-5.75 2.58-5.75 5.75s2.58 5.75 5.75 5.75 5.75-2.58 5.75-5.75-2.58-5.75-5.75-5.75zm2.416 5.374-3 2c-.127.084-.272.126-.416.126-.194 0-.386-.075-.531-.22l-1-1c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l.565.565 2.488-1.659c.344-.231.81-.137 1.04.208s.137.81-.208 1.04zm-8.666-11.374v2.75c0 .14.11.25.25.25h3c.14 0 .25-.11.25-.25v-2.75zm7.25 0h-2.25v2.75c0 .96-.79 1.75-1.75 1.75h-3c-.96 0-1.75-.79-1.75-1.75v-2.75h-2.25c-1.52 0-2.75 1.23-2.75 2.75v12c0 1.52 1.23 2.75 2.75 2.75h5.6c-1.73-1.32-2.85-3.41-2.85-5.75 0-4 3.25-7.25 7.25-7.25 1.38 0 2.66.38 3.75 1.06v-2.81c0-1.52-1.23-2.75-2.75-2.75z"/>      
                        </svg>
                        <H3Title className="iconeTitle" h3Text="Disponibilité"/>
                        <p className="iconContent">Dès la réception de votre demande, un technicien prendra rapidement contact avec vous pour vérifier vos disponibilité.</p>
                    </div>

                    <div className="iconGroup">
                        <svg
                            className = "icon"
                            id = "Layer_1"
                            fill = "#BB271A"
                            viewBox = "0 0 512 512"
                            xmlns = "http://www.w3.org/2000/svg"      
                        >
                            <path d="m177.596 283.637c-11.243 7.106-21.326 10.644-37.212 13.127l74.853 74.853c2.483-15.886 6.021-25.97 13.127-37.212-3.709-1.482-7.182-3.719-10.177-6.713l-33.877-33.877c-2.994-2.995-5.231-6.467-6.713-10.177zm157.518 115.398c1.354-6.882-.637-13.423-5.596-18.382l-62.028-62.028c4.14-9.271 3.425-20.217-2.146-28.909l8.651-8.651 71.831 71.831c1.952 1.952 5.118 1.952 7.07 0s1.952-5.118 0-7.07l-71.831-71.831 22.033-22.033 77.555 77.555c4.96 4.96 11.5 6.951 18.382 5.597 25.663-5.051 53.293 2.362 73.178 22.247 19.846 19.846 27.273 47.407 22.282 73.028-1.535 7.881-11.211 10.836-16.888 5.158l-31.339-31.349c-2.596-2.597-6.113-3.54-9.66-2.589l-22.027 5.902c-3.547.951-6.12 3.524-7.071 7.071l-5.902 22.027c-.95 3.547-.008 7.064 2.59 9.66l31.349 31.339c5.678 5.677 2.724 15.353-5.158 16.888-25.621 4.991-53.182-2.437-73.028-22.283-19.885-19.885-27.298-47.515-22.247-73.178zm-141.74-154.525-62.027-62.027c-4.959-4.96-11.5-6.951-18.382-5.596-25.663 5.051-53.293-2.362-73.178-22.247-19.846-19.846-27.274-47.408-22.282-73.028 1.535-7.881 11.212-10.836 16.888-5.158l31.339 31.349c2.596 2.597 6.113 3.54 9.66 2.589l22.027-5.902c3.547-.95 6.12-3.524 7.071-7.071l5.902-22.027c.95-3.547.008-7.064-2.59-9.66l-31.349-31.339c-5.679-5.677-2.724-15.353 5.158-16.888 25.621-4.99 53.182 2.436 73.028 22.282 19.885 19.885 27.298 47.515 22.247 73.178-1.354 6.882.636 13.422 5.596 18.382l77.555 77.555-22.033 22.033-71.831-71.831c-1.952-1.952-5.118-1.952-7.07 0s-1.952 5.118 0 7.07l71.831 71.83-8.651 8.651c-8.692-5.571-19.638-6.286-28.909-2.146zm60.802 76.11c-7.953 7.953-20.966 7.953-28.919 0l-33.877-33.877c-7.953-7.953-7.953-20.966 0-28.919s20.966-7.952 28.919 0l33.877 33.877c7.952 7.953 7.953 20.966 0 28.919zm146.606-180.483c1.427-1.427 3.014-2.289 4.988-2.709l28.828-6.14c2.542-.541 4.547-1.856 6.057-3.972l40.383-56.587c2.862-4.01 2.415-9.396-1.069-12.88l-25.819-25.819c-3.484-3.484-8.869-3.931-12.88-1.069l-56.587 40.383c-2.115 1.51-3.43 3.515-3.972 6.057l-6.14 28.829c-.42 1.974-1.282 3.561-2.709 4.988l-142.013 142.014 28.919 28.919zm-270.124 161.042-88.081 88.081c-22.045 22.045-22.045 58.117 0 80.162s58.118 22.045 80.162 0l88.081-88.081-80.162-80.163zm-55.567 116.079c-1.952 1.952-5.118 1.952-7.07 0s-1.952-5.118 0-7.07l64.873-64.873c1.952-1.952 5.118-1.952 7.07 0s1.952 5.118 0 7.07zm26.721 26.721c-1.952 1.952-5.118 1.952-7.07 0s-1.952-5.118 0-7.07l64.873-64.873c1.952-1.952 5.118-1.952 7.07 0s1.952 5.118 0 7.07z"/>
                        </svg>
                        <H3Title className="iconeTitle" h3Text="Profesionnalisme"/>
                        <p className="iconContent">Equipé des dernières technologies de pointes en matière de contrôles et sécurité, notre équipe est à votre service pour assurer la longevité de votre véhicule</p>
                    </div>
                    <div className="iconGroup">
                        <svg
                            className="icon"
                            id = "Layer_1"
                            fill = "#BB271A"
                            viewBox = "0 0 512 512"
                            xmlns = "http://www.w3.org/2000/svg"                    
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
                className="RepairSection"
                title="Besoind'une réparation ?"
                into="Chez Garage V.Parrot, nous sommes spécialisés dans la réparation et la carrosserie des véhicules, offrant des services de qualité pour redonner vie à votre voiture après un accident ou une usure normale. Avec notre équipe compétente et expérimentée, nous sommes prêts à relever tous les défis, des réparations mineures aux rénovations majeures."
                photo1={article2Photo1}
                alt1="Homme portant des gants noire cirant la carrosserie d'une voiture violette"
                article1="Que votre véhicule nécessite des travaux de redressement de la carrosserie, des réparations des éléments de la carrosserie, la réparation des pare-chocs, des ailes ou des portières, nous sommes équipés pour fournir des résultats exceptionnels. Nous utilisons des techniques de pointe, des outils spécialisés et des matériaux de haute qualité pour assurer une finition impeccable."
                photo2={article2Photo2}
                alt2="Homme en combinaison grise travaillant sur le moteur d'une voiture"
                article2="Nos mécaniciens et techniciens sont formés pour diagnostiquer rapidement les problèmes mécaniques et électroniques, afin d'effectuer les réparations nécessaires avec précision. Que ce soit pour la transmission, le système de freinage, la suspension ou tout autre composant, nous sommes compétents pour résoudre les problèmes et vous remettre en route en toute sécurité."        
            />

           <section className="iconSection2">
              <div className="iconsContainers2">

                  <div className="icone2Group1">
                      <svg
                          className="icone1"
                          id="Icon"
                          fill="#BB271A"
                          viewBox="0 0 64 64"
                          xmlns="http://www.w3.org/2000/svg"             
                      >
                          <path d="M17.05609,42.33154,22.49622,62h-3.6886A12.88729,12.88729,0,0,1,6.5,52.7998C6.03418,51.90625,3.3252,46.09961,3.3252,32c0-14.10059,2.709-19.90723,3.1748-20.7998A12.88908,12.88908,0,0,1,18.80664,2h3.561L17.43445,20.41016c-1.21082,1.80169-2.36218,5.13025-2.36218,11.28515C15.07227,37.19769,15.99249,40.42957,17.05609,42.33154ZM20.19336,18.291l3.81641.10546c.03711.001.07421.001.1123.001a3.99809,3.99809,0,0,0,3.84668-2.90918l2.37988-8.39746A4.0217,4.0217,0,0,0,26.501,2H24.438L20.06677,18.31274A1.27482,1.27482,0,0,1,20.19336,18.291Zm7.71875,29.6289a4.016,4.016,0,0,0-3.84961-2.9043h-.02539l-3.80176.02735a1.91825,1.91825,0,0,1-.377-.08289L24.57141,62H26.624a4.02188,4.02188,0,0,0,3.84668-5.0957ZM33,19a.99943.99943,0,0,0-1,1V32a.99928.99928,0,0,0,.293.707l5,5A.99989.99989,0,0,0,38.707,36.293L34,31.58594V20A.99943.99943,0,0,0,33,19ZM33,4c-.28149,0-.55994.013-.83948.0213A7.39506,7.39506,0,0,1,31.878,9.02844c.04047-.00195.08154-.00134.122-.00311V16a1,1,0,0,0,2,0V9.02533a22.90965,22.90965,0,0,1,14.53217,6.02844l-4.92572,4.92572a.99989.99989,0,1,0,1.41406,1.41406l4.92572-4.92572A22.90965,22.90965,0,0,1,55.97467,31H49a1,1,0,0,0,0,2h6.97467a22.90965,22.90965,0,0,1-6.02844,14.53217l-4.92572-4.92572a.99989.99989,0,1,0-1.41406,1.41406l4.92572,4.92572A22.90965,22.90965,0,0,1,34,54.97467V48a1,1,0,0,0-2,0v6.97064l.39453,1.38483a5.95533,5.95533,0,0,1-.11212,3.62634c.2392.006.47693.01819.71759.01819A28,28,0,0,0,33,4Z"/>
                      </svg>
                      <H3Title className="icon2Title" h3Text="Rendez-vous"/>
                  </div>

                  <div className="arrow1">
                      <svg
                          className="arrow"
                          id="svg6"
                          fill="#000000"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"                     
                      >
                          <path d="m12 12.414-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0zm0-5-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0z"/>
                      </svg>
                  </div>

                  <div className="icone2Group2">
                      <svg
                          className="icone2"
                          id="Layer_1"
                          fill="#BB271A"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"             
                      >
                          <path d="m510.22 187.83-16.14-18.11v-124.58c0-6.18-5.02-11.22-11.19-11.22h-224.48c-6.19 0-11.23 5.04-11.23 11.22v120.25h-157.86c-13.58 0-24.99 9.29-27.75 22.6l-16.37 79.32c-25.4 2.87-45.2 24.49-45.2 50.64v117.24c0 3.87 3.14 7 7 7h16.39v21.89c0 7.72 6.28 14 14 14h39.63c7.72 0 14-6.28 14-14v-21.89h37.08v10.75c0 3.86 3.14 7 7 7h136.8c3.87 0 7-3.14 7-7v-10.75h37.08v21.89c0 7.72 6.28 14 14 14h39.63c7.72 0 14.01-6.28 14.01-14v-21.89h16.38c3.87 0 7-3.13 7-7v-64.06h14.77c18.288 0 33.166-14.878 33.166-33.166v-111.604h25.084c20.62 0 31.98-12.03 31.98-33.87 0-1.72-.64-3.38-1.78-4.66zm-215.1-83.16h20.83l18.65-39.36c1.16-2.45 3.62-4.01 6.33-4.01 2.7 0 5.16 1.56 6.32 4.01l20.55 43.37 8.25 17.4 2.8-5.92c.01-.02.02-.04.03-.06l11.4-24.06 9.15-19.31c1.16-2.44 3.62-4 6.32-4 1.35 0 2.65.39 3.75 1.09 1.1.69 2 1.69 2.58 2.91l13.24 27.94h20.86c3.86 0 7 3.14 7 7 0 3.87-3.14 7.01-7 7.01h-25.29c-.21 0-.43-.01-.64-.04-.06.01-.12 0-.18-.01-.15-.01-.29-.04-.44-.07-.24-.04-.48-.09-.7-.16-.11-.03-.22-.07-.33-.11-.5-.17-.97-.39-1.41-.67-.14-.08-.27-.17-.4-.27-.9-.65-1.63-1.5-2.14-2.5-.06-.12-.12-.24-.17-.36l-8.73-18.41-2.66 5.61-.03.06-11.53 24.35-9.16 19.33c-1.15 2.44-3.62 4-6.32 4-2.71 0-5.17-1.56-6.33-4l-14.57-30.76-14.22-30.02-14.09 29.73c-.04.1-.09.2-.14.29-.07.16-.15.31-.24.46-.14.26-.3.5-.48.73-.14.21-.31.41-.49.6-.08.09-.17.17-.26.26-.25.24-.51.46-.79.66-.12.08-.24.17-.37.24-.42.27-.88.49-1.36.66-.13.05-.27.09-.41.13-.21.06-.43.11-.65.15-.16.03-.32.06-.48.07-.05.01-.09.02-.14.01-.21.03-.43.04-.65.04h-25.26c-3.87 0-7-3.14-7-7.01 0-3.86 3.13-7 7-7zm-234.4 272.7h-46.71v-30.99h34.18c6.91 0 12.53 5.62 12.53 12.53zm204.18 68.57h-122.8v-21.52h122.8zm8.14-68.57h-139.05l-9.12-30.99h157.29zm-213.47-110.39 15.72-76.16c1.39-6.73 7.16-11.43 14.03-11.43h149.24l-7.52 8.44c-1.14 1.28-1.77 2.94-1.77 4.66 0 21.84 11.36 33.87 32 33.87h77.8l8.4 40.62zm333.43 110.39h-46.69v-18.46c0-6.91 5.62-12.53 12.53-12.53h34.16zm47.933-39.406c0 10.566-8.596 19.162-19.163 19.162h-14.77v-39.206c0-26.13-19.79-47.74-45.17-50.61l-8.45-40.95h87.553zm-189.043-152.474 5.44-6.1h226.61l5.43 6.1z"/>
                      </svg>
                      <H3Title className="icon2Title" h3Text="Diagnostique"/>
                  </div>

                  <div className="arrow2">
                      <svg
                          className="arrow"
                          id="svg6"
                          fill="#000000"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"                     
                      >
                          <path d="m12 12.414-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0zm0-5-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0z"/>
                      </svg>
                  </div>

                  <div className="icone2Group3">
                      <svg
                          className="icone3"
                          id="Layer"
                          fill="#BB271A"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"             
                      >
                          <path d="m12.75 5v-2.25l4.5 4.5h-2.25c-1.58 0-2.25-.67-2.25-2.25zm-.01 14.6a.3.3 0 0 1 -.28.4h-6.46a2.652 2.652 0 0 1 -3-3v-12a2.652 2.652 0 0 1 3-3h5.25v3a3.381 3.381 0 0 0 3.75 3.75h3v3.46a.306.306 0 0 1 -.29.3 5.514 5.514 0 0 0 -5.21 5.49 5.251 5.251 0 0 0 .24 1.6zm-.99-4.6a.75.75 0 0 0 -.75-.75h-4a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 .75-.75zm2.25-3.25a.75.75 0 0 0 0-1.5h-7a.75.75 0 0 0 0 1.5zm8 6.25a4 4 0 1 1 -4-4 4 4 0 0 1 4 4zm-2.4-1.187a.5.5 0 0 0 -.708 0l-1.313 1.313-.479-.48a.5.5 0 0 0 -.708.708l.833.833a.5.5 0 0 0 .708 0l1.667-1.667a.5.5 0 0 0 0-.707z"/>
                      </svg>
                      <H3Title className="icon2Title" h3Text="Devis"/>
                  </div>

                  <div className="arrow3">
                      <svg
                          className="turnArrow"
                          id="Icons"
                          fill="#000000"
                          viewBox="0 0 48 48"
                          xmlns="http://www.w3.org/2000/svg"                     
                      >
                          <path d="m33 16h-24.172l6.586-6.586-2.828-2.828-10 10a2 2 0 0 0 0 2.828l10 10 2.828-2.828-6.586-6.586h24.172a9 9 0 0 1 0 18h-31v4h31a13 13 0 0 0 0-26z"/>
                      </svg>
                  </div>

                  <div className="icone2Group4">
                      <svg
                          className="icone4"
                          id="LAyer_1"
                          fill="#BB271A"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"             
                      >
                          <path d="m16 314.509v-117.017c0-2.548 2.072-4.621 4.62-4.621h28.31c2.547 0 4.62 2.073 4.62 4.621v117.017c0 2.547-2.073 4.62-4.62 4.62h-28.31c-2.547 0-4.62-2.073-4.62-4.62zm82.821-.01c9.495 2.859 19.282 5.788 39.801 5.751l43.049-3.382c8.844-.695 12.642-6.877 12.428-12.328-.182-4.638-3.443-10.053-12.036-10.053h-20.215c-2.761 0-5-2.239-5-5s2.239-5 5-5h29.438c6.794 0 12.321-5.527 12.321-12.321s-5.527-12.321-12.321-12.321h-26.445c-2.761 0-5-2.239-5-5s2.239-5 5-5h31.411c6.794 0 12.321-5.527 12.321-12.321s-5.527-12.321-12.321-12.321h-27.045c-2.761 0-5-2.239-5-5s2.239-5 5-5h33.416c6.794 0 12.321-5.527 12.321-12.321s-5.527-12.321-12.321-12.321h-49.994c-1.369 0-2.678-.562-3.622-1.553-.944-.992-1.44-2.327-1.372-3.694.303-6.14 1.271-11.966 2.207-17.601 2.201-13.247 4.28-25.759-1.599-42.76-1.797-5.196-6.903-17.142-15.394-15.869-9.883 1.483-11.31 12.095-12.982 30.723-2.034 22.654-4.564 50.848-35.349 60.118-2.873.865-12.846 2.377-20.969 2.615v106.795c16.99-.328 25.886 2.337 35.271 5.164zm11.086-175.586c1.633-18.188 3.321-36.996 21.458-39.717 11.211-1.679 20.804 6.516 26.328 22.49 6.391 18.483 4.526 32.398 2.339 45.689 24.576-26.55 59.4-42.018 95.967-42.018s71.39 15.468 95.967 42.018c-2.187-13.291-4.052-27.206 2.339-45.689 5.524-15.975 15.117-24.171 26.329-22.49 18.136 2.721 19.825 21.529 21.458 39.717 1.947 21.688 3.96 44.116 28.273 51.437 1.12.337 5.433 1.076 10.342 1.611l-15.228-36.709c-.642-1.546-.467-3.31.465-4.7l25.698-38.32-51.875-51.875-38.319 25.698c-1.39.932-3.154 1.107-4.7.465l-52.158-21.636c-1.544-.641-2.666-2.011-2.989-3.651l-8.92-45.233h-73.363l-8.919 45.233c-.323 1.64-1.445 3.01-2.989 3.651l-52.158 21.636c-1.545.642-3.311.466-4.7-.465l-38.32-25.698-51.875 51.875 25.697 38.32c.932 1.39 1.107 3.154.465 4.7l-15.224 36.702c4.913-.533 9.219-1.266 10.34-1.604 24.312-7.321 26.325-29.749 28.272-51.437zm353.163 180.216h28.31c2.547 0 4.62-2.073 4.62-4.62v-117.017c0-2.548-2.072-4.621-4.62-4.621h-28.31c-2.547 0-4.62 2.073-4.62 4.621v117.017c0 2.547 2.073 4.62 4.62 4.62zm-89.041 11.122c-.415 0-.831.015-1.249-.017l-8.808-.692c-24.41 35.787-64.615 57.102-107.974 57.102s-83.564-21.312-107.974-57.102l-8.808.692c-.417.033-.835.017-1.249.017-21.525 0-32.412-3.279-42.033-6.177-7.448-2.243-14.068-4.237-24.914-4.682l15.496 37.356c.642 1.546.467 3.31-.465 4.7l-25.697 38.32 51.875 51.875 38.32-25.697c1.39-.933 3.154-1.108 4.7-.466l52.157 21.635c1.544.641 2.667 2.011 2.99 3.651l8.919 45.233h73.363l8.92-45.233c.323-1.64 1.445-3.01 2.99-3.651l52.157-21.635c1.546-.643 3.31-.467 4.7.466l38.319 25.697 51.875-51.875-25.698-38.32c-.932-1.39-1.107-3.154-.465-4.701l15.496-37.354c-10.843.446-17.465 2.438-24.913 4.681-9.62 2.897-20.51 6.177-42.033 6.177zm18.103-190.443c-1.672-18.628-3.1-29.24-12.982-30.723-8.501-1.267-13.597 10.673-15.394 15.869-5.879 17-3.8 29.513-1.599 42.76.936 5.635 1.904 11.461 2.207 17.601.068 1.367-.428 2.702-1.372 3.694-.944.991-2.253 1.553-3.622 1.553h-49.994c-6.794 0-12.321 5.527-12.321 12.321s5.527 12.321 12.321 12.321h33.416c2.761 0 5 2.239 5 5s-2.239 5-5 5h-27.045c-6.794 0-12.321 5.527-12.321 12.321s5.527 12.321 12.321 12.321h31.411c2.761 0 5 2.239 5 5s-2.239 5-5 5h-26.445c-6.794 0-12.321 5.527-12.321 12.321s5.527 12.321 12.321 12.321h29.438c2.761 0 5 2.239 5 5s-2.239 5-5 5h-20.215c-8.593 0-11.854 5.416-12.037 10.053-.214 5.451 3.584 11.633 12.428 12.328l43.049 3.382c20.474.04 30.306-2.891 39.801-5.751 9.385-2.827 18.281-5.493 35.271-5.164v-106.795c-8.121-.241-18.095-1.75-20.968-2.614-30.785-9.271-33.316-37.464-35.35-60.118z"/>
                      </svg>
                      <H3Title className="icon2Title" h3Text="Satisfaction"/>
                  </div>

                  <div className="arrow4">
                      <svg
                          className="arrow"
                          id="svg6"
                          fill="#000000"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"                     
                      >
                          <path d="m12 12.414-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0zm0-5-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0z"/>
                      </svg>
                  </div>

                  <div className="icone2Group5">
                      <svg
                          className="icone5"
                          id="LAyer_1"
                          fill="#BB271A"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"             
                      >
                          <path d="m479 1.133h-446a33.039 33.039 0 0 0 -33 33v319.081a33.043 33.043 0 0 0 33 33h146.421l69.66 120.648a7.99 7.99 0 0 0 13.848 0l69.66-120.648h146.411a33.038 33.038 0 0 0 33-33v-319.084a33.034 33.034 0 0 0 -33-33zm-99.64 167.116a25.428 25.428 0 1 1 0 50.856h-246.722a25.428 25.428 0 0 1 0-50.856zm0 34.851h-246.722a9.428 9.428 0 0 1 0-18.856h246.72a9.428 9.428 0 1 1 0 18.856zm0 46.481a25.428 25.428 0 1 1 0 50.856h-246.722a25.428 25.428 0 0 1 0-50.856zm0 34.861h-246.722a9.431 9.431 0 0 1 0-18.861h246.72a9.431 9.431 0 0 1 0 18.861zm0-197.535a25.428 25.428 0 1 1 0 50.856h-246.722a25.428 25.428 0 0 1 0-50.856zm0 34.856h-246.722a9.428 9.428 0 0 1 0-18.856h246.72a9.428 9.428 0 1 1 0 18.856z"/>
                      </svg>
                      <H3Title className="icon2Title" h3Text="Compte rendu"/>
                  </div>

                  <div className="arrow5">
                      <svg
                          className="arrow"
                          id="svg6"
                          fill="#000000"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"                     
                      >
                          <path d="m12 12.414-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0zm0-5-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0z"/>
                      </svg>
                  </div>

                  <div className="icone2Group6">
                      <svg
                          className="icone6"
                          id="setting_tool"
                          fill="#BB271A"
                          viewBox="0 0 64 64"
                          xmlns="http://www.w3.org/2000/svg"             
                      >
                          <path d="m4.576 10.603c.115-.323.388-.565.723-.641.331-.077.685.025.927.269l5.196 5.196 2.671-1.335 1.335-2.67-5.197-5.197c-.243-.243-.344-.593-.269-.927.076-.335.317-.607.641-.722 7.512-2.739 15.134 4.424 12.886 12.078l7.804 7.805-6.834 6.834-7.805-7.805c-7.652 2.254-14.82-5.379-12.078-12.885zm42.77 29.909-7.805-7.805-6.834 6.834 7.804 7.805c-1.891 6.156 3.143 12.815 9.568 12.648 1.114 0 2.237-.186 3.318-.57.323-.115.564-.387.641-.722.075-.334-.025-.685-.269-.927l-5.197-5.197 1.335-2.67 2.671-1.335 5.196 5.196c.242.243.594.343.927.269.335-.076.607-.317.723-.641 2.742-7.504-4.427-15.141-12.078-12.885zm12.078-29.909c-.219-.677-1.16-.892-1.649-.372 0 0-5.196 5.196-5.196 5.196l-2.671-1.335-1.335-2.67 5.197-5.197c.243-.243.344-.593.269-.927-.076-.335-.317-.607-.641-.722-7.508-2.74-15.136 4.426-12.886 12.078l-23.857 23.858c-7.654-2.254-14.819 5.379-12.078 12.885.115.323.388.565.723.641.331.075.685-.027.927-.269l5.196-5.196 2.671 1.335 1.335 2.67-5.197 5.197c-.243.243-.344.593-.269.927.076.335.317.607.641.722 1.081.384 2.203.57 3.318.57 6.423.168 11.46-6.493 9.567-12.648l23.857-23.858c7.653 2.251 14.82-5.378 12.078-12.885z"/>
                      </svg>
                      <H3Title className="icon2Title" h3Text="Réparation"/>
                  </div>
                 
              </div>
           </section>

           <Section
                className="conclusionSection"
                photo1={conclusionPhoto1}
                alt1="Garagiste en salopette grise et tee-shirt noir accroupie et accoudé sur un pneu"
                article1="Chez Garage V.Parrot, nous sommes fiers de notre engagement envers la satisfaction du client. Nous vous tiendrons informé de l'avancement des travaux et nous vous fournirons des devis détaillés avant d'entreprendre toute réparation ou rénovation. Notre approche transparente et notre attention méticuleuse aux détails nous permettent de vous offrir un service de réparation et de carrosserie de premier ordre."
                photo2={conclusionPhoto2}
                alt2="poignée de main entre deux hommes"
                article2="Confiez-nous votre véhicule et faites l'expérience d'un service professionnel et fiable. Prenez rendez-vous dès aujourd'hui et laissez notre équipe qualifiée prendre soin de votre voiture, lui redonnant son apparence et ses performances optimales."       
            />



        </main>

    </div>
  );
};

export default Home;