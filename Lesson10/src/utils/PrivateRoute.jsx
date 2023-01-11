import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function PrivateRoute() {
  const token = localStorage.getItem('token');
  return (
    <div>
      {token ? (
        <div>
          <Header />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </div>
  );
}
