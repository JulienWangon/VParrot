import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ links }) => {
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
              <button className="navbar-toggler ma-toggler-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fa-solid fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                  <ul className="navbar-nav navMenu">
                      {links.map((link, index) => (
                          <li className="navItem" key={index}>
                              {link.url ? ( <Link to={link.url} className="navLink">{link.text}</Link>) : ( <button>{link.text}</button>)}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>        
      </nav>
  );
};

export default Navbar;