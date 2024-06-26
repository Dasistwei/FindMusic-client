import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorage } from "../../utils/LocalStorage";

export const ProtectedRoutes = () => {
  const token = LocalStorage.getAuthToken()

  if (!token) return <Navigate to='/sign_in' />
  return <Outlet />
}