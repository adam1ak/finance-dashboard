import './App.css'

import { useState, useEffect } from 'react'


import { auth } from './firebase/firebaseConfig';

import Authentication from './components/Authentication'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Dashboard from './components/Dashboard'
import ErrorPage from './components/ErrorPage';

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

    <div>
      <BrowserRouter>
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

          <Route path="*" element={<ErrorPage />}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
