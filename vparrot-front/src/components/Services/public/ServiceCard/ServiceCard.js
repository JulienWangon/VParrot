import React from 'react';

import ContactBtn from '../../../common/Buttons/ContactBtn/ContactBtn';

import './serviceCard.css';

const ServiceCard = ({ name, description, price, pathImg }) => {

  const cardStyle = {

      backgroundImage: `url(${pathImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
  }

  return (
    <div className="serviceCard" style={cardStyle}>
        <div className="overlay"></div>
        <div className="cardContent">
            <h3 className="cardTitle">{name}</h3>
            <p className="cardDescription">{description}</p>
            <p className="cardPrice">{price}</p>
            <div className="contactContainer">
                <ContactBtn className="whiteBtn" additionalData={{  subject: `Demande d'info sur ${name}`  }}/>
            </div>

        </div>      
    </div>
  );
};

export default ServiceCard;