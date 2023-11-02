import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return children;
    }

    return <Navigate to="/home" replace />;
};

export default ProtectedRoute;