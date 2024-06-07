import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useUser } from './UserContext'; // Importing useUser hook assuming you have a UserContext

function ProtectedRoute({ element, allowedRoles }) {
  const { user } = useUser();
  const isAuthenticated = user !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/home" />;
  }

  return <Route element={element} />;
}

export default ProtectedRoute;
