// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UniverseLogin from './system-parts/universe/SignIn';
import ChangePassword from './system-parts/universe/ChangePassword';
import MainDashboard from './system-parts/universe/MainDashboard';
import FormBuilder from './system-parts/universe/FormBuilder';
import ProtectedRoute from './system-parts/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router basename="/universe">
      <Routes>
        <Route path="/signin" element={<UniverseLogin />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-workbench/forms-builder"
          element={
            <ProtectedRoute>
              <FormBuilder />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
