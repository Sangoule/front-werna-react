// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userData = JSON.parse(localStorage.getItem('user'));

  return userData && userData.access_token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
