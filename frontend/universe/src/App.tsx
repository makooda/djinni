// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppTheme from './shared-theme/AppTheme';
import { Provider } from 'react-redux';
import store from './store/store';
import UniverseLogin from './system-parts/universe/SignIn';
import ChangePassword from './system-parts/universe/ChangePassword';
import MainDashboard from './system-parts/universe/MainDashboard';
import FormBuilder from './system-parts/universe/FormBuilder';
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
                path="/" 
                element={
                    <ProtectedRoute>
                        <MainDashboard /> 
                    </ProtectedRoute>
                }
                /> 
              <Route
                path="/universe/ds-code/forms-builder" 
                element={
                    <ProtectedRoute>
                        <FormBuilder />
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