import React from 'react';

import H2Title from '../H2Title/H2Title';
import Article from '../Article/Article';

import './section.css';

const Section = ({ className, intro, title, photo1, alt1, article1, photo2, alt2, article2, bgColor }) => {
  return (
    <section className={className} style={{backgroundColor: bgColor}}>

        <H2Title h2Text={title}/>
        <p className="introduction">{intro}</p>
          <Article className="firstArticle" photo={photo1} altText={alt1} article={article1}/>
          <Article className="secondArticle" photo={photo2} altText={alt2} article={article2}/>                 
    </section>
  );
};

export default Section;