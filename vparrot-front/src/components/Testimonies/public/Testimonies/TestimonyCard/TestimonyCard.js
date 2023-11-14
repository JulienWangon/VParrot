import React from 'react';

import StarRating from '../StarRating/StarRating';

import './testimonyCard.css'

const TestimonyCard = ({ lastName, firstName, content, rating }) => {
  return (
    <div className="testimonyCard">
        <div className="testimonyHeader">
            <div className="nameContainer">
                <span className="testimonyLastName">{lastName}</span>
            </div>
            <div className="nameContainer">
                <span className="testimonyFirstName">{firstName}</span>
            </div>     
        </div>
        <div className="testimonyBody">

            <span className="testimonyContent">{content}</span>

        </div>
        <div className="testimonyFooter">

            <StarRating rating={rating}/>

        </div>      
    </div>
  );
};

export default TestimonyCard;