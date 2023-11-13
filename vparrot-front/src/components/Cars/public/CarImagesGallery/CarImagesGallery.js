import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './carImagesGallery.css';

const CarImagesGallery = ({ images, brand, model }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="fullGallery">

      <Slider {...settings}>
        {images.map((image, index) => (
          <div className="pics" key={index}>
            <img className="carPics" src={image} alt={`${brand} ${model} - Vue ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarImagesGallery;
