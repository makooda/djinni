import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store'; // Adjust the import path as necessary

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    // Check authentication from Redux state or localStorage
    const isAuthenticated = useSelector((state: RootState) => state.auth.accessToken !== null);

    if (!isAuthenticated) {
        return <Navigate to="/universe/signin" />;
    }
    return children;
};

export default ProtectedRoute;
