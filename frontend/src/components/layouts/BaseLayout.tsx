import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function BaseLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <main className="size-full min-h-dvh bg-primary-light/70 dark:bg-zinc-900 relative">
        <Outlet />
      </main>
    </>
  );
}

export default BaseLayout;
