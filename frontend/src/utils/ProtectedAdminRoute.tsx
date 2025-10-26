import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedAdminRoute() {
  const { user } = useAuth();

  if (user === undefined) {
    return null;
  } else if (user === null) {
    return <Navigate to="/login" />;
  } else if (user.accountType !== "admin") {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}
