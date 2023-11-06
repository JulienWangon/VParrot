import React from 'react';

const StarRating = ({ rating }) => {

    const stars = Array.from({ length: 5 }, (_, index) => {
        return index < rating ? '★' : '☆';
    });

    return (
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