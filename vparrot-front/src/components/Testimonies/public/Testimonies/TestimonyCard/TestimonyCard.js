import React from 'react';

import StarRating from '../StarRating/StarRating';

import './testimonyCard.css'

const TestimonyCard = ({ last_name, first_name, content, rating }) => {
  return (
    <div className="testimonyCard">
        <div className="testimonyHeader">
            <div className="nameContainer">
                <span className="testimonyLastName">{last_name}</span>
            </div>
            <div className="nameContainer">
                <span className="testimonyFirstName">{first_name}</span>
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