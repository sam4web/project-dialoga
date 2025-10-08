import { selectIsConnected, selectIsTooManyRequests } from "@/app/slices";
import { isUserAuthenticated, selectAuthToken } from "@/features/auth/slice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { store, useAppDispatch } from "@/app/store";
import { useEffect } from "react";
import { initializeSocket } from "@/app/socket";
import { Spinner } from "@/components";

function AuthRequired() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  const isTooManyRequests = useSelector(selectIsTooManyRequests);
  const token = useSelector(selectAuthToken);
  const dispatch = useAppDispatch();
  const isSocketConnected = useSelector(selectIsConnected);

  useEffect(() => {
    const socket = initializeSocket(store, token);
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [token, dispatch]);

  if (isTooManyRequests) {
    return <Navigate to={"/error/too-many-requests"} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (!isSocketConnected)
    return (
      <div className="w-full h-dvh flex-center">
        <Spinner />
      </div>
    );

  return <Outlet />;
}

export default AuthRequired;
