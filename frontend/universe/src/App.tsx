// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UniverseLogin from './components/universe/SignIn';
import MainDashboard from './components/universe/MainDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>      
        <Route path="/universe/signin" element={<UniverseLogin />} /> 
        <Route 
          path="/universe/dashboard" 
           element={
              <ProtectedRoute>
                  <MainDashboard /> 
              </ProtectedRoute>
           }
           /> 
      </Routes>
  </Router>
  );
};

export default App;
