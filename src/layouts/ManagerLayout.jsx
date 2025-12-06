import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ManagerHomePage from "../Pages/ManagerHomePage";
import ProductPage from "../Pages/ProductPage";
import ProductModal from "../Components/ProductModal";

export default function ManagerLayout() {

  return (
    <div className="w-[100vw] h-[100vh]">
      <Navbar />

      <main className="w-full h-[80%]">
        <Routes>
          <Route path="" element={<ManagerHomePage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="sales" element={<h1>Sales Page</h1>} />
        </Routes>
      </main>
    </div>
  );
}
