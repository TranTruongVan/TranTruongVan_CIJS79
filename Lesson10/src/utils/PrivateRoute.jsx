import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  return (
    <div>
      {token ? <Outlet /> : <Navigate to="/auth/login" />}
    </div>
  )
}
