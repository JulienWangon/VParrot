import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 100); 

        return () => clearTimeout(timer);
    }, []);

    
    if (loading && !isReady) {
        return null; 
    }

    if (!currentUser) {
        return <Navigate to="/accueil" replace />;
    }

    return children;
};

export default ProtectedRoute;
