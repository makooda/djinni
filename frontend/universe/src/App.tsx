// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppTheme from './shared-theme/AppTheme';
import { Provider } from 'react-redux';
import store from './store/store';
import UniverseLogin from './system-parts/universe/SignIn';
import ChangePassword from './system-parts/universe/ChangePassword';
import MainDashboard from './system-parts/universe/MainDashboard';
import ProtectedRoute from './system-parts/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AppTheme mode="light">
      <Provider store={store}>
          <Router>
            <Routes>      
              <Route path="/universe/signin" element={<UniverseLogin />} /> 
              <Route path="/universe/change-password" element={<ChangePassword />} />
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
    </AppTheme>
  );
};

export default App;