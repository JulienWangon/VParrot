import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth(); // Supposer qu'il y a un état de chargement dans useAuth
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 100); // ajustez ce temps selon les besoins

        return () => clearTimeout(timer);
    }, []);

    // Vous attendez soit que l'état de chargement soit terminé, soit que le délai soit écoulé
    if (loading && !isReady) {
        return null; // ou votre indicateur de chargement discret ici
    }

    if (!currentUser) {
        return <Navigate to="/accueil" replace />;
    }

    return children;
};

export default ProtectedRoute;
