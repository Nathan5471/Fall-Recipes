import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (user === undefined) {
    return null;
  } else if (user === null) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
