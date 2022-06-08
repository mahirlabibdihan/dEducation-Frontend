import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Login, Home, Signup, Profile } from "./pages";
import { Background } from "./components";
import Cookies from "universal-cookie";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Private = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
const Public = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};
const App = () => {
  return (
    <Router>
      <Background>
        <Routes>
          <Route element={<Private />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<Public />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Background>
    </Router>
  );
};

export default App;
