import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ManagerHomePage from "../Pages/ManagerHomePage";
import ProductPage from "../Pages/ProductPage";
import ServicesPage from "../Pages/ServicesPage";
import AccountsPage from "../Pages/AccountsPage";
import SalesPage from "../Pages/SalesPage";

export default function ManagerLayout() {

  return (
    <div className="w-[100vw] h-[100vh]">
      <Navbar />

      <main className="w-full h-[80%]">
        <Routes>
          <Route path="" element={<ManagerHomePage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="sales" element={<SalesPage />} />
        </Routes>
      </main>
    </div>
  );
}
