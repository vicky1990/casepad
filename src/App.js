import React, { useState } from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import Home from "./Home";
import Login from "./Login";
import NewPatient from "./NewPatient";
import AddVisit from "./AddVisit";
import Signup from "./Signup";
import AddDiagnosis from "./AddDiagnosis";

import useAuth from "./components/useAuth";

import { AuthProvider } from "./components/useAuth";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Header
} from "react-router-dom";

import "./App.css";

function RequireAuth({ children }) {
  const { authed } = useAuth();

  return authed === true ? children : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/newpatient"
            element={
              <RequireAuth>
                <NewPatient />
              </RequireAuth>
            }
          />
          <Route
            path="/diagnosis"
            element={
              <RequireAuth>
                <AddDiagnosis />
              </RequireAuth>
            }
          />
          <Route
            path="/visit"
            element={
              <RequireAuth>
                <AddVisit />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
