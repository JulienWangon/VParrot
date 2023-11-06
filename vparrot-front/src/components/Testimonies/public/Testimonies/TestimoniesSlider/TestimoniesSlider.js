import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import TestimonyCard from '../TestimonyCard/TestimonyCard';

import './testimoniesSlider.css';

import useFetchModeratedTestimonies from '../../../hooks/useFetchModeratedTestimonies';
import Button from '../../../../common/Button/Button';


const TestimoniesSlider = () => {

    const { testimonies, loading, error } = useFetchModeratedTestimonies();

    //Affiche le chargement des données
    if (loading) return <div>Loading...</div>

    //Affiche l'erreur si il y en a une
    if (error) return <div errorContainer>Erreur: {error}</div>


    //Slider settings
    const settings = {
      arrows: false,
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      puseOnHover: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      
     
     
      responsive: [

        {
          breakpoint: 2500,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            centerMode: true,
          }
        },
       
        {
          breakpoint: 1440, 
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          }
        },
        {
          breakpoint: 1200, 
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          }
        },
        {
          breakpoint: 992, 
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            centerMode: true
          }
        },
        {
          breakpoint: 768, 
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: true
          }
        },
        {
          breakpoint: 550, 
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true
          }
        }
      ]
    };

  return (
    <>
    <Slider {...settings}>

        {testimonies.map((testimony) => (
            <div key={testimonies.id_testimony}>
                <TestimonyCard {...testimony} />
            </div>
        ))}
      
    </Slider>

    <div className="testimoniesConclusion">        
        <p className="testimoniesTextSection">Tu nous as confié ton véhicule, tu as trouvé le véhicule de tes rêve parmis notre large sélection de véhicules d'occasions ? Racontes nous ton expérience en laissant un avis ! </p>
        <Button className="addTestimonyBtn" colorStyle="redBtn">Déposer un avis</Button>
    </div>
    
    </>
  );
};

export default TestimoniesSlider;