// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from './pages/login/login';
import App from './pages/app/App';
import SignUp from './pages/signup/SignUp';
import MarketingPage from './pages/marketing/marketingpage';
import Dashboard from './pages/dashboard/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/app" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />     
        </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
