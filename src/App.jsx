import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SalesPage from "./Pages/SalesPage";
import ManagerLayout from "./layouts/ManagerLayout";
import { PrivateRoute } from "./Components/PrivateRoutes";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import { useSelector } from "react-redux";

export default function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage/>}
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute auth={auth} role={role} allowedRoles={[1]}>
              <SalesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/*"
          element={
            <PrivateRoute auth={auth} role={role} allowedRoles={[2]}>
              <ManagerLayout />
            </PrivateRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}
