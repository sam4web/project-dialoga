import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BaseLayout, Toast } from "@/components";
import { selectCurrentTheme, selectIsTooManyRequests } from "@/app/slices";
import { isUserAuthenticated } from "@/features/auth/slice";
import { isProtected } from "@/lib/routeHelper";

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(isUserAuthenticated);
  const isTooManyRequests = useSelector(selectIsTooManyRequests);
  const currentTheme = useSelector(selectCurrentTheme);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (isTooManyRequests) {
      if (location.pathname !== "/error/too-many-requests") {
        navigate("/error/too-many-requests", { replace: true });
      }
      return;
    }

    if (isProtected(location.pathname) && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isTooManyRequests, location.pathname, navigate]);

  return (
    <>
      <Toast />
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    </>
  );
};

export default Root;
