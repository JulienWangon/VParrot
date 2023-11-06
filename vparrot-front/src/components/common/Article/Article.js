import React from 'react';

const Article = ({ className, photo, altText, article }) => {
  return (
    <article className={className}>
      
        <img className ="picture" src={photo} alt={altText}/>
        <p>{article}</p>
      
    </article>
  );
};

export default Article;