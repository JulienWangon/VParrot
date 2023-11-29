import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { useTestimonies } from '../../../../../contexts/TestimoniesContext';

import TestimonyCard from '../TestimonyCard/TestimonyCard';
import TestimonyModal from '../../TestimonyModal/TestimonyModal';
import Button from '../../../../common/Buttons/Button/Button';

import './testimoniesSlider.css';





const TestimoniesSlider = () => {

    const { testimonies } = useTestimonies();

    const approvedTestimonies = testimonies['approuvé'];
  
    const [isModalOpen, setIsModalOpen] = useState(false);


    //configuration du carrousel
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

    const handleTestimonyCreated = () => {
      
  };

  return (
    <>
    <Slider {...settings}>

        {approvedTestimonies.map((testimony) => (
            <div key={testimony.idTestimony}>
                <TestimonyCard {...testimony} />
            </div>
        ))}
      
    </Slider>

    <div className="testimoniesConclusion">        
        <p className="testimoniesTextSection">Tu nous as confié ton véhicule, tu as trouvé le véhicule de tes rêves parmi notre large sélection de véhicules d'occasion ? Raconte-nous ton expérience en laissant un avis ! Nous apprécions sincèrement chaque retour de nos clients, car il nous aide à améliorer continuellement notre service. Ton opinion est précieuse pour nous et pour la communauté des conducteurs qui, comme toi, recherchent qualité et fiabilité. Partage ton histoire et contribue à construire la réputation de confiance qui est la marque de Garage V.Parrot.</p>
        <Button className="addTestimonyBtn" colorStyle="redBtn" onClick={() => setIsModalOpen(true)}>Déposer un avis</Button>
    </div>
    {isModalOpen && <TestimonyModal mode="creation" onClose={() => setIsModalOpen(false)} onTestimonyCreated={handleTestimonyCreated}/>}
    </>
  );
};

export default TestimoniesSlider;