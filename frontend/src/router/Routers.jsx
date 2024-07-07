import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ThankYou from "../pages/ThankYou";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import About from "./../pages/About";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import TourDetails from "./../pages/TourDetails";
import Tours from "./../pages/Tours";
import TourList from "../components/Admin/TourList";
import AdminPage from "../pages/Admin";
import Gallery from "../pages/Gallery";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/about" element={<About />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
};

export default Routers;
