import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SalesPage from "./Pages/SalesPage";
import ManagerLayout from "./layouts/ManagerLayout";
import { PrivateRoute } from "./Components/PrivateRoutes";
import UnauthorizedPage from "./Pages/UnauthorizedPage";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage setAuth={setAuth} setRole={setRole} />}
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
            <PrivateRoute auth={auth} role={role} allowedRoles={[1]}>
              <ManagerLayout />
            </PrivateRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}
