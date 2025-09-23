import { selectIsTooManyRequests } from "@/app/slices";
import { isUserAuthenticated } from "@/features/auth/slice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthRequired() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  const isTooManyRequests = useSelector(selectIsTooManyRequests);
  if (isTooManyRequests) {
    return <Navigate to={"/error/too-many-requests"} replace />;
  }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
}

export default AuthRequired;
