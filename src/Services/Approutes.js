import React from 'react'
import { BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'

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
          <Landing />
        </RequireAuth>
        }
    />
    </Routes>
  )
}

function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = 1;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
  
export default AppRoutes