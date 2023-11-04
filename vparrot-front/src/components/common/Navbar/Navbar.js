import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../Button/Button';

const Navbar = () => {

    const { currentUser, logout} = useAuth();

    //public links list
    const publicLinks = [

        { text: "Accueil", url: "/accueil" },
        { text: "Entretiens", url: "/entretiens" },
        { text: "Réparation", url: "/reparations" },
        { text: "Espace vente", url: "/ventes" },

    ];

    //admin list links
    const adminLinks = [

        {text: "Accueil", url: "/accueiladmin"},
        {text: "Utilisateurs", url: "/utilisateurs"},
        {text: "Avis clients", url: "/avisclients"},
        {text: "Horaires", url: "/horaires"},
        {text: "Services", url: "/services"},
        {text: "Parc auto", url: "/parcauto"},

    ]

    const links = currentUser ? adminLinks : publicLinks;


    
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
                                {link.url ? ( <Link to={link.url} className="navLink">{link.text}</Link>) : ( <Button className="navLink" onClick={logout} colorStyle="whiteBtn">{link.text}</Button>)}
                            </li>
                        ))}

                        {currentUser && (
                            <li className="navItem">
                                <Button className="navLink btn-danger" onClick={logout}>
                                    Déconnexion
                                </Button>
                            </li>
                        )}
                  </ul>
              </div>
          </div>        
      </nav>
  );
};

export default Navbar;