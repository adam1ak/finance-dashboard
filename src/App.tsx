import './App.css'

import { useState, useEffect } from 'react'


import { auth } from './firebase/firebaseConfig';

import Authentication from './pages/Authentication'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import ErrorPage from './components/ErrorPage';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (

    <div className="h-screen">
      <BrowserRouter>
        {isAuthenticated && <Header/>}
        
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/authentication" replace />
              )
            }
          />

          <Route
            path="/authentication"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Authentication />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/authentication" replace />
              )
            }
          />

          <Route
            path="/transactions"
            element={
              isAuthenticated ? (
                <Transactions />
              ) : (
                <Navigate to="/authentication" replace />
              )
            }
          />

          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <Settings />
              ) : (
                <Navigate to="/authentication" replace />
              )
            }
          />

          <Route path="*" element={<ErrorPage />}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
