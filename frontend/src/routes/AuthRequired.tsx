import { isUserAuthenticated } from "@/features/auth/slice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthRequired() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}

export default AuthRequired;
