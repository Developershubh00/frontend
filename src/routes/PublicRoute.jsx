import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from;

    if (from?.pathname) {
      return <Navigate to={from.pathname + from.search + from.hash} replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
}

export default PublicRoute;
