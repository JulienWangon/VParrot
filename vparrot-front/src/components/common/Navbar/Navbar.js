import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/Button/Button';
import UnauthorizedModal from './UnauthorizedModal/UnauthorizedModal';

//CSS import
import './navbar.css';

const Navbar = () => {

    const { currentUser, logout} = useAuth();
    const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
    const navigate = useNavigate();

    const adminOnlyLinks = ["Utilisateurs", "Horaires", "Services"];

    const checkAuthorization = (linkText) => {
        if (adminOnlyLinks.includes(linkText) && currentUser?.role !== 'admin') {
            setShowUnauthorizedModal(true);
            return false;
        }
        return true;
    };

    const handleLinkClick = (linkText, url) => {
        // Si le lien ne nécessite pas de vérification d'autorisation, ou si l'utilisateur est autorisé
        if (!adminOnlyLinks.includes(linkText) || checkAuthorization(linkText)) {
            navigate(url);
        }
    };
    

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
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler ma-toggler-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                    <ul className="navbar-nav navMenu">
                    {links.map((link, index) => (
                        <li className="navItem" key={index}>
                            <a 
                                href={link.url} 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(link.text, link.url);
                                }} 
                                className="navLink"
                            >
                                {link.text}
                            </a>
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

        {showUnauthorizedModal && (
            <UnauthorizedModal
                title="Accès Non Autorisé"
                onClose={() => setShowUnauthorizedModal(false)}
            >
                <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette fonctionnalité.</p>
            </UnauthorizedModal>
        )}
    </>
  );
};

export default Navbar;