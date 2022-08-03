import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Login,
  Landing,
  Home,
  Signup,
  Profile,
  RequestTutor,
  Tutors,
  Coachings,
  MyTutors,
  MyCoachings,
  MyStudents,
  TuitionOffers,
  Coaching,
  MyCourses,
  Applicants,
  Batches,
} from "./pages";
import Layout from "./components/Layout";
import { Background } from "./components";
import Cookies from "universal-cookie";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogContent } from "@mui/material";
import { Audio } from "react-loader-spinner";

const showToast = (message, type) => {
  if (type === "success") toast.success(message, {});
  else if (type === "error") toast.error(message, {});
  else toast.dark(message, {});
};
const Private = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};
const Public = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("token");
  return isLoggedIn ? <Navigate to="/home" /> : <Outlet />;
};
var setLoading;
const App = () => {
  const [loading, setL] = useState(false);
  setLoading = setL;
  return (
    <div>
      <Dialog open={loading}>
        <DialogContent>
          <Audio color="#00BFFF" height={100} width={100} />
        </DialogContent>
      </Dialog>
      <ToastContainer
        style={{ width: "270px" }}
        position="top-right"
        theme="colored"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route element={<Private />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/tutors" element={<Tutors />} />
            <Route path="/home/coachings" element={<Coachings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/req_tutor" element={<RequestTutor />} />
            <Route path="/req_tutor/applicants" element={<Applicants />} />
            <Route path="/my_tutors" element={<MyTutors />} />
            <Route path="/my_coachings" element={<MyCoachings />} />
            <Route path="/my_students" element={<MyStudents />} />
            <Route path="/tuition_offers" element={<TuitionOffers />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/my_courses" element={<MyCourses />} />
            <Route path="/my_courses/batches" element={<Batches />} />
          </Route>
          <Route element={<Public />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
export { showToast, setLoading };
