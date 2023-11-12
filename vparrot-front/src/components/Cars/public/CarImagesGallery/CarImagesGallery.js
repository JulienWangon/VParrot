import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarImagesGallery = ({ images, brand, model }) => {
  const settings = {
    customPaging: function(i) {
      return (
        <button>
          <img src={images[i]} alt={`${brand} ${model} - Thumbnail ${i + 1}`} />
        </button>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <h2>Images de la voiture</h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`${brand} ${model} - Vue ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarImagesGallery;
