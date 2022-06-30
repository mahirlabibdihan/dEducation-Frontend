import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Login, Landing, Signup, Profile, RequestTutor } from "./pages";
import Layout from "./components/Layout";
import { Background } from "./components";
import Cookies from "universal-cookie";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
const Private = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
const Public = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? <Navigate to="/profile" /> : <Outlet />;
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Private />}>
          <Route path="/home" element={<></>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/req_tutor" element={<RequestTutor />} />
          <Route path="/my_tutors" element={<></>} />
          <Route path="/my_coachings" element={<></>} />
          <Route path="/my_students" element={<></>} />
          <Route path="/tuition_offers" element={<></>} />
        </Route>
        <Route element={<Public />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
