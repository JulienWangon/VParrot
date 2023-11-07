import React from 'react';

import './article.css';


const Article = ({ className, photo, altText, paragraphe1, paragraphe2 }) => {
  return (
    <article className={className}>
      
        <img className ="articlePhoto" src={photo} alt={altText}/>
        <div className="textContainer">
            <p className="articleText">{paragraphe1}</p>
            <p className="articleText">{paragraphe2}</p>
        </div>
      
    </article>
  );
};

export default Article;