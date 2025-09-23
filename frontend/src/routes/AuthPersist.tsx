import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { sendRefreshTokenRequest } from "@/features/auth/slice";
import Spinner from "@/components/common/Spinner";
import { useAppDispatch } from "@/app/store/hooks";

const AuthPersist = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return (
      <div className="w-full h-dvh flex-center">
        <Spinner />
      </div>
    );

  return <Outlet />;
};

export default AuthPersist;
