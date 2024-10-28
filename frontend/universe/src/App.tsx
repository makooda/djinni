// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import UniverseLogin from './system-parts/universe/SignIn';
import MainDashboard from './system-parts/universe/MainDashboard';
import ProtectedRoute from './system-parts/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
      </Provider>
  );
};

export default App;
