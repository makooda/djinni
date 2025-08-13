import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    // Check authentication from Redux state or localStorage
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken !== null);

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }
    return children;
};

export default ProtectedRoute;
