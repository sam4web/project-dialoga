import { Navigate, Outlet } from "react-router-dom";
import { isUserAuthenticated } from "@/features/auth/slice/authSlice";
import { useSelector } from "react-redux";

function ProtectedRoutes() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
