import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SalesPage from "./Pages/SalesPage";
import ManagerPage from "./Pages/ManagerPage";
import OwnerPage from "./Pages/OwnerPage";
import UnauthorizedPage from "./Pages/UnauthorizedPage";

export function App() {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setAuth={setAuth} setRole={setRole} />} />
        <Route 
          path="/sales" 
          element={
            <PrivateRoute auth={auth} role={role} allowedRoles={['salesman']}>
              <SalesPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/manager" 
          element={
            <PrivateRoute auth={auth} role={role} allowedRoles={['manager']}>
              <ManagerPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/owner" 
          element={
            <PrivateRoute auth={auth} role={role} allowedRoles={['owner']}>
              <OwnerPage />
            </PrivateRoute>
          } 
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}
