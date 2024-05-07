import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRouteWrapper({ element: Component, authCheck }) {
  const isAuthenticated = authCheck();

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
}

export default PrivateRouteWrapper;