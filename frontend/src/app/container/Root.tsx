import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BaseLayout, Toast } from "@/components";
import { selectCurrentTheme, selectIsTooManyRequests } from "@/app/slices";
import { toast } from "react-toastify";

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isTooManyRequests = useSelector(selectIsTooManyRequests);
  const currentTheme = useSelector(selectCurrentTheme);

  // scrolls to the top of the page on route change.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // sets the application's theme.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [currentTheme]);

  // prevents redirect loops for 'too many requests' errors by showing a toast on specific routes.
  useEffect(() => {
    if (isTooManyRequests) {
      if (["/", "/error/too-many-requests"].some((route) => route === location.pathname)) {
        toast.error("Too many requests. Please try again in a few minutes.");
      } else {
        navigate("/error/too-many-requests", { replace: true });
      }
      return;
    }
  }, [isTooManyRequests, location.pathname, navigate]);

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
