import React from 'react';

import H1Title from '../H1Title/H1Title';
import Navbar from '../Navbar/Navbar';


const Header = ({ title, slogan}) => {


  console.log('Header props:', { title, slogan });
  return (
    <header className="header">
        <div className="opacityLayer"></div>
        <Navbar/>
        <H1Title h1Text={title} spanText={slogan}/>      
    </header>
  );
};

export default Header;