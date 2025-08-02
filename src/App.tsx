import './App.css'

import { useState, useEffect } from 'react'

import { auth } from './firebase/firebaseConfig';
import { getFirestore, doc, getDoc } from "firebase/firestore";

import Authentication from './pages/Authentication'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'


import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import ErrorPage from './components/ErrorPage';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true)

        const userUid = auth.currentUser?.uid;

        try{
          if (userUid) {
            const userDocRef = doc(db, "users", userUid);
            getDoc(userDocRef).then((docSnap) => {
              setUserName(docSnap.data()?.name)
            });

          } else {
            throw new Error("User UID is undefined");
          }
        } catch (error) {
          console.error("Error: ", error)
        }

      } else {
        setIsAuthenticated(false)
      }
    })

    return () => unsubscribe()
  }, [db])


  return (

    <div className="h-screen">
      <BrowserRouter>
        {isAuthenticated && <Header userName={userName}/>}

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

          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
