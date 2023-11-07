import React from 'react';

import H2Title from '../H2Title/H2Title';
import Article from '../Article/Article';

import './section.css';

const Section = ({ className, intro, title, photo1, alt1, paragraphe11, paragraphe12 ,paragraphe21, paragraphe22, photo2, alt2, bgColor }) => {
  return (
    <section className={className} style={{backgroundColor: bgColor}}>

        <H2Title h2Text={title}/>
        <p className="introduction">{intro}</p>
        <div class="articleContainer">
          <Article className="firstArticle" photo={photo1} altText={alt1} paragraphe1={paragraphe11} paragraphe2={paragraphe12}/>
          <Article className="secondArticle" photo={photo2} altText={alt2} paragraphe1={paragraphe21} paragraphe2={paragraphe22}/>
        </div>               
    </section>
  );
};

export default Section;