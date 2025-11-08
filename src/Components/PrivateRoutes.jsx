import { Navigate } from "react-router-dom";

export function PrivateRoute({ auth, role, allowedRoles, children }) {
  if (!auth) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
  return children;
}
