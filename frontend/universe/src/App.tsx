// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UniverseLogin from './components/universe/SignIn';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>      
        <Route path="/universe/signin" element={<UniverseLogin />} />   
      </Routes>
  </Router>
  );
};

export default App;
