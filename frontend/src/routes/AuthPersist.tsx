import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { sendRefreshTokenRequest } from "@/features/auth/slice";
import Spinner from "@/components/common/Spinner";
import { useAppDispatch } from "@/app/store/hooks";
import { Id, toast } from "react-toastify";

const AuthPersist = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const persistentToastIdRef = useRef<null | Id>(null);
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHomePage = useMemo(() => location.pathname === "/", [location.pathname]);

  useEffect(() => {
    if (!loading || isHomePage) {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
      if (persistentToastIdRef.current) {
        toast.dismiss(persistentToastIdRef.current);
        persistentToastIdRef.current = null;
      }
      toast.dismiss();
      return;
    }

    const initialToastId = toast.info("Retrieving information.");
    timerIdRef.current = setTimeout(() => {
      toast.dismiss(initialToastId);
      persistentToastIdRef.current = toast.info("This might take a moment.", {
        autoClose: false,
        position: "top-center",
      });
    }, 2000);

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
      if (persistentToastIdRef.current) {
        toast.dismiss(persistentToastIdRef.current);
        persistentToastIdRef.current = null;
      }
      toast.dismiss(initialToastId);
    };
  }, [isHomePage, loading]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await dispatch(sendRefreshTokenRequest()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, [dispatch]);

  if (isHomePage) {
    return <Outlet />;
  }

  if (loading)
    return (
      <div className="w-full h-dvh flex-center">
        <Spinner />
      </div>
    );

  return <Outlet />;
};

export default AuthPersist;
