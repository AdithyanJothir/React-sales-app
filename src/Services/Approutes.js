import React from 'react';
import { BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import {getAuth} from "./auth";
import Dashboard from "../Pages/Dashboard";
import Landing from '../Components/Landing';
import Login from '../Pages/Login';
import Shops from '../Pages/Shops';
import {useState,useEffect} from 'react';


export default function AppRoutes() {
  return (
    <Routes>
    <Route exact path="/" element={<Login />} />
    <Route exact path="/login" element={<Login />} />

    <Route
      exact
      path="/dashboard"
      element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
        }
    />

    <Route
      exact
      path="/shops"
      element={
        <RequireAuth>
          <Shops />
        </RequireAuth>
        }
    />


    </Routes>
  )
};


export function RequireAuth({ children }) {
  // const [isAuth,setAuth] = useState(false);
  
  //   async function checkAuth(){
  //     console.log("Checking Auth")
  //     const access = await localStorage.getItem("access");
  //     console.log(access);
  //     if (access) {
  //       await setAuth(true);
  //       console.log("Set Auth Status 1");
  //       console.log(isAuth);
  //     }
  //     else {
  //       console.log("Set  Auth Status 0")
  //     }
  // }
  // useEffect(()=>{
  //   checkAuth();
  // });
  
  
  

  return (localStorage.getItem("access") ? children : <Navigate to='/login' replace />); 
  };
  
  
  
 