import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import ProtectedRoute from "./utils/ProtectedRoute";
import Create from "./pages/Create";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import Admin from "./pages/Admin";

function App() {
  const { user, getUser } = useAuth();

  useEffect(() => {
    if (user === undefined) {
      getUser();
    }
  }, [getUser, user]);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:recipeId" element={<Recipe />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<Create />} />
        </Route>
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
