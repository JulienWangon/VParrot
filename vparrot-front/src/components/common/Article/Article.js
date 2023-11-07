import React from 'react';

import './article.css';


const Article = ({ className, photo, altText, article }) => {
  return (
    <article className={className}>
      
        <img className ="articlePhoto" src={photo} alt={altText}/>
        <p className="articleText">{article}</p>
      
    </article>
  );
};

export default Article;