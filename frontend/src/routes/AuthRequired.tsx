import { selectIsTooManyRequests } from "@/app/slices";
import { isUserAuthenticated, selectAuthToken } from "@/features/auth/slice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { store, useAppDispatch } from "@/app/store";
import { initializeSocket } from "@/utils/socket";
import { useEffect } from "react";

function AuthRequired() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  const isTooManyRequests = useSelector(selectIsTooManyRequests);
  const token = useSelector(selectAuthToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const socket = initializeSocket(store, token);
    if (socket) {
      cleanup = () => {
        socket.disconnect();
      };
    }
    return cleanup;
  }, [token, dispatch]);

  if (isTooManyRequests) {
    return <Navigate to={"/error/too-many-requests"} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
}

export default AuthRequired;
