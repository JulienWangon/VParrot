import React from 'react';

//Components import
import H1Title from '../H1title/H1Title';
import Navbar from '../Navbar/Navbar';

//CSS import
import './header.css';

const Header = ({ title, slogan}) => {

  return (
    <header className="header">
        <div className="opacityLayer"></div>
        <Navbar/>
        <H1Title h1Text={title} spanText={slogan}/>      
    </header>
  );
};

export default Header;