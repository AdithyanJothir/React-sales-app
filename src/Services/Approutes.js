import React from 'react'
import { BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import {getAuth} from "./auth";
import Dashboard from "../pages/dashboard";
import Landing from '../Components/Landing';

function AppRoutes() {
  return (
    <Routes>
    <Route exact path="/" element={<Landing />} />
    <Route path="/login" element={<Landing />} />
    <Route
      path="/dashboard"
      element={
        <RequireAuth redirectTo="/login">
          <Dashboard />
        </RequireAuth>
        }
    />
    </Routes>
  )
}

function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = getAuth();
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
  
export default AppRoutes