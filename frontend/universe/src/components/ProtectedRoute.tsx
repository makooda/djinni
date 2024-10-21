import * as React from 'react';
import * as ReactDom from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
        return <ReactDom.Navigate to='/universe/signin' />;
    }
    return children;
};

export default ProtectedRoute;