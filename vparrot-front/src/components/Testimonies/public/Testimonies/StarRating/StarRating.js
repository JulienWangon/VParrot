import React from 'react';

//Recoit une props ratin qui repsente la note 
const StarRating = ({ rating }) => {
    //Création d'un tableau avec 5 étoiles basé sur la note
    const stars = Array.from({ length: 5 }, (_, index) => {
    //Si l'index de l'étoile est inférieur à la note elle est pleine sinon l'étoile est vide
        return index < rating ? '★' : '☆';
    });

    return (
        //Rendu du tableau d'étoile une étoile par balise span 
      <>
          {stars.map((star, index) => (
              <span key={index} className="star">
                  {star}
              </span>
          ))}
        
      </>
    );
};

export default StarRating;